from django.contrib.auth.models import BaseUserManager


class ManagerObjects(BaseUserManager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=self.model.Role.MANAGER)

class SalesObjects(BaseUserManager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=self.model.Role.SALES)

class CSObjects(BaseUserManager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=self.model.Role.CS)


