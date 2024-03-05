from django.urls import path 
from ..views import (
    CustomerAPIView ,
    SubscriptionAPIView , 
    NotesAPIView ,
    dashboard
)


urlpatterns = [
    path("customers",CustomerAPIView.as_view()) ,
    path("subscriptions",SubscriptionAPIView.as_view()) ,
    path("notes",NotesAPIView.as_view()) ,
    path("dashboard",dashboard) ,
]
