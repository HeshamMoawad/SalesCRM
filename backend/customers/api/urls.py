from django.urls import path 
from ..views import (
    CustomerAPIView ,
    SubscriptionAPIView
)


urlpatterns = [
    path("customers/",CustomerAPIView.as_view()) ,
    path("subscriptions/",SubscriptionAPIView.as_view()) ,

]
