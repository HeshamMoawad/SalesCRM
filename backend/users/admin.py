from django.contrib import admin
from .models import BaseUser , Manager , Project , Sales , CS
from utils.users import get_fieldsets
# Register your models here.


class BaseUserAdminSite(admin.ModelAdmin):
    list_display = ("username" , 'role',"project","is_staff","is_superuser")
    list_filter = ("project","role")

class ManagerAdminSite(admin.ModelAdmin):
    list_display = ("username" , 'role' )
    fieldsets = get_fieldsets("Manager")

class SalesAdminSite(admin.ModelAdmin):
    list_display = ("username" , 'role' , "project")
    list_filter = ("project",)
    fieldsets = get_fieldsets("Sales")

class CSAdminSite(admin.ModelAdmin):
    list_display = ("username" , 'role' , "project")
    list_filter = ("project",)
    fieldsets = get_fieldsets("CS")
    



admin.site.register(Project)
admin.site.register(BaseUser, BaseUserAdminSite)
admin.site.register(Manager , ManagerAdminSite)
admin.site.register(Sales , SalesAdminSite)
admin.site.register(CS , CSAdminSite)
