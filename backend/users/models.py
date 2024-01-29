from django.db import models
from django.contrib.auth.models import AbstractBaseUser , PermissionsMixin , User
from django.contrib.auth.validators import UnicodeUsernameValidator


class Project(models.Model):
    name = models.CharField(verbose_name="Project Name",max_length=100)
    logo = models.ImageField(verbose_name="Logo" , upload_to='projects-logo/')

    def __str__(self):
        return self.name

class UserConfig(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE , related_name="user_config_rel" )
    project = models.ForeignKey(Project,on_delete=models.CASCADE,related_name='user_project' , blank=True , null=True)
    is_manager = models.BooleanField(verbose_name="Manager", default=False)
