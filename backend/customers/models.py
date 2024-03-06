from django.db import models
from users.models import (
    BaseUser ,
    Project ,
)
from uuid import uuid4
from utils.customer import validate_number
from datetime import datetime , timedelta


class Customer(models.Model):
    uuid = models.CharField(verbose_name="UUID" , default=uuid4 ,max_length=200 , unique=True)
    creator = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL , null=True , related_name="customer_creator")
    project = models.ForeignKey(Project  ,verbose_name="Project", on_delete= models.SET_NULL , null=True)
    name = models.CharField(max_length=200,verbose_name="Name" )
    phone = models.CharField(max_length=13 ,verbose_name="Phone Number")
    is_deleted = models.BooleanField(verbose_name="Deleted" , default=False)
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)

    def save(self, *args, **kwargs) -> None:
        self.phone = validate_number(self.phone)
        self.saver = kwargs.pop('user', None)
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
    customer = models.ForeignKey(Customer ,verbose_name="Object", on_delete=models.CASCADE, related_name="customer_update")


class Subscription(models.Model):
    uuid = models.CharField(verbose_name="UUID" , default=uuid4 ,max_length=200 , unique=True)
    creator = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL , null=True , related_name="subscription_creator")
    customer =  models.ForeignKey(Customer ,verbose_name="Customer", on_delete=models.CASCADE , null=True , related_name="subscription_customer")
    text = models.TextField(verbose_name="Text"  ,max_length=1500 , blank=True , default='')
    cs = models.ForeignKey(BaseUser ,verbose_name="CS", on_delete=models.SET_NULL , null=True , related_name="subscription_cs")
    start_date = models.DateTimeField(verbose_name="Start Subscription Date")
    end_date = models.DateTimeField(verbose_name="End Subscription Date")
    price = models.IntegerField(verbose_name="Subscription Price")
    collected_price = models.IntegerField(verbose_name="Collected Price")
    deuration = models.CharField(verbose_name="Deuration" ,max_length=200 ,blank=True )
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.customer}'

    # def is_unpaid_subscription(self):
    #     return (self.price - self.collected_price) > 0

    # def is_duration_valid(self):
    #     return self.end_date.date() >= datetime.now().date()

    def save(self, *args, **kwargs) -> None:
        if self.collected_price > self.price :
            self.collected_price = self.price
        self.saver = kwargs.pop('user', None)
        created = kwargs.pop('created',True)
        if self.saver :
            if created :
                self.start_date = datetime.strptime(self.start_date.replace(" ",''),'%m/%d/%Y')#-timedelta(days=-1)+'-T%H:%M:%S.%fZ'
            self.end_date = datetime.strptime(self.end_date.replace(" ",''),'%m/%d/%Y')#-timedelta(days=-1)'%Y-%m-%dT%H:%M:%S.%fZ'
        
        return super().save(*args, **kwargs)

class SubscriptionNote(models.Model):
    subscription = models.ForeignKey(Subscription ,verbose_name="Subscription", on_delete=models.CASCADE ,null=True , related_name="subscription_note" )
    creator = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL , null=True , related_name="subscription_note_creator")
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)
    note = models.CharField(verbose_name="Note" ,max_length=600)

    def save(self, *args, **kwargs) -> None:
        self.saver = kwargs.pop('user', None)
        if self.saver != None :
            self.creator = self.saver
        return super().save(*args, **kwargs)

class SubscriptionUpdatesRecord(models.Model):
    user = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL ,null=True )
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)
    subscription = models.ForeignKey(Subscription ,verbose_name="Object", on_delete=models.CASCADE  , related_name="subscription_update")
