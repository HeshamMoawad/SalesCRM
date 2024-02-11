from django.db import models
from django.core.exceptions import ValidationError
from users.models import (
    BaseUser ,
    Project ,
)
from uuid import uuid4
from .utils import validate_number
# Create your models here.




class Customer(models.Model):
    uuid = models.CharField(verbose_name="UUID" , default=uuid4 ,max_length=200)
    creator = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL , null=True)
    project = models.ForeignKey(Project  ,verbose_name="Project", on_delete= models.SET_NULL , null=True)
    name = models.CharField(max_length=200,verbose_name="Name" )
    phone = models.CharField(max_length=13 ,verbose_name="Phone Number",unique=True)
    is_deleted = models.BooleanField(verbose_name="Deleted" , default=False)
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)

    def save(self, *args, **kwargs) -> None:
        self.phone = validate_number(self.phone)
        return super().save(*args, **kwargs)


class UpdatesRecord(models.Model):
    user = models.ForeignKey(BaseUser ,verbose_name="Creator", on_delete=models.SET_NULL ,null=True )
    created_at = models.DateTimeField(verbose_name="Creation Date & Time",auto_now_add=True)
    obj = models.ForeignKey(Customer ,verbose_name="Object", on_delete=models.CASCADE )
    