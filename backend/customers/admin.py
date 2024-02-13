from django.contrib import admin
from .models import Customer , Subscription , SubscriptionNote , SubscriptionUpdatesRecord ,CustomerUpdatesRecord
# Register your models here.


class CustomerAdminSite(admin.ModelAdmin):
    list_display = ("name" , 'phone', "project" ,"creator")
    list_filter = ("project","creator" )

class SubscriptionAdminSite(admin.ModelAdmin):
    list_display = ( "customer" , "creator" ,"cs","price","collected_price")
    list_filter = ("cs","creator")

class SubscriptionNoteAdminSite(admin.ModelAdmin):
    list_display = (  "subscription" ,"creator","note","created_at")
    list_filter = ("subscription","creator")

class SubscriptionUpdatesRecordAdminSite(admin.ModelAdmin):
    list_display = ( "user" , "subscription" ,"created_at")
    list_filter = ("subscription" ,)

class CustomerUpdatesRecordAdminSite(admin.ModelAdmin):
    list_display = ( "user" , "customer" ,"created_at")
    list_filter = ("customer",)


admin.site.register(Customer , CustomerAdminSite)
admin.site.register(Subscription , SubscriptionAdminSite)
admin.site.register(SubscriptionNote , SubscriptionNoteAdminSite)
admin.site.register(SubscriptionUpdatesRecord , SubscriptionUpdatesRecordAdminSite)
admin.site.register(CustomerUpdatesRecord , CustomerUpdatesRecordAdminSite)
