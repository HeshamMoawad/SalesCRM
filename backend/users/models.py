from django.db import models
from django.contrib.auth.models import AbstractUser , PermissionsMixin
from .managers import (
    ManagerObjects,
    SalesObjects,
    CSObjects
)


class Project(models.Model):
    name = models.CharField(verbose_name="Project Name", max_length=100)
    logo = models.ImageField(verbose_name="Logo", upload_to='projects-logo/')

    def __str__(self):
        return self.name


class BaseUser(AbstractUser):
    class Role (models.TextChoices):
        MANAGER = ("MANAGER", "Manager")
        SALES = ("SALES", "Sales")
        CS = ("CS", "CS")

    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    role = models.CharField(
        max_length=100, verbose_name="Role", choices=Role.choices
        )

    _password = models.CharField(verbose_name='Password Without Hash (Required)', max_length=128)

    def __str__(self):
        return f"{self.username}"
    
    def save(self,*args,**kwargs):
        self.set_password(self._password)
        return super().save(*args,**kwargs)


    class Meta:
        verbose_name = "BaseUser"
        verbose_name_plural = "BaseUsers"


class Manager(BaseUser):
    objects = ManagerObjects()

    def save(self, *args, **kwargs):
        self.role = self.Role.MANAGER
        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Manager"
        verbose_name_plural = "Managers"


class Sales(BaseUser):
    objects = SalesObjects()

    def save(self, *args, **kwargs):
        self.role = self.Role.SALES
        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Sales"
        verbose_name_plural = "Sales"


class CS (BaseUser):
    objects = CSObjects()

    def save(self, *args, **kwargs):
        self.role = self.Role.CS
        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = "CS"
        verbose_name_plural = "CS"
