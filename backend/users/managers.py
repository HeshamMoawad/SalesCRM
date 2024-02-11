from django.contrib.auth.models import BaseUserManager
from django.db.models import Manager

class ManagerObjects(Manager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=self.model.Role.MANAGER)

class SalesObjects(Manager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=self.model.Role.SALES)

class CSObjects(Manager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=self.model.Role.CS)


