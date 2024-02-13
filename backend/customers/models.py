from django.db import models
from users.models import (
    BaseUser ,
    Project ,
)
from uuid import uuid4
from utils.customer import validate_number


class Customer(models.Model):
    uuid = models.CharField(verbose_name="UUID" , default=uuid4 ,max_length=200)
    creator = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL , null=True , related_name="customer_creator")
    project = models.ForeignKey(Project  ,verbose_name="Project", on_delete= models.SET_NULL , null=True)
    name = models.CharField(max_length=200,verbose_name="Name" )
    phone = models.CharField(max_length=13 ,verbose_name="Phone Number")
    is_deleted = models.BooleanField(verbose_name="Deleted" , default=False)
    cs = models.ForeignKey(BaseUser ,verbose_name="CS", on_delete=models.SET_NULL , null=True , related_name="customer_cs")
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)

    def save(self, *args, **kwargs) -> None:
        self.phone = validate_number(self.phone)
        return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name

    class Meta:
        unique_together = ["phone" , "project"]
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'


class CustomerUpdatesRecord(models.Model):
    user = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL ,null=True )
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)
    customer = models.ForeignKey(Customer ,verbose_name="Object", on_delete=models.CASCADE, related_name="customer_update" )


class Subscription(models.Model):
    uuid = models.CharField(verbose_name="UUID" , default=uuid4 ,max_length=200)
    creator = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL , null=True , related_name="subscription_creator")
    customer =  models.ForeignKey(Customer ,verbose_name="Customer", on_delete=models.CASCADE , null=True , related_name="subscription_customer")
    start_date = models.DateTimeField(verbose_name="Start Subscription Date")
    end_date = models.DateTimeField(verbose_name="End Subscription Date")
    price = models.IntegerField(verbose_name="Subscription Price")
    collected_price = models.IntegerField(verbose_name="Collected Price")
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)

    def is_unpaid_subscription(self):
        return (self.price - self.collected_price) > 0

    def save(self, *args, **kwargs) -> None:
        if self.collected_price > self.price :
            self.collected_price = self.price
        return super().save(*args, **kwargs)

class SubscriptionNote(models.Model):
    subscription = models.ForeignKey(Subscription ,verbose_name="Creator", on_delete=models.CASCADE ,null=True , related_name="subscription_note" )
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)
    note = models.CharField(verbose_name="Note" , default=uuid4 ,max_length=600)

class SubscriptionUpdatesRecord(models.Model):
    user = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL ,null=True )
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)
    subscription = models.ForeignKey(Subscription ,verbose_name="Object", on_delete=models.CASCADE  , related_name="subscription_update")
