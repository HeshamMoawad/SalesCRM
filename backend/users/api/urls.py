from django.urls import path , include
from rest_framework.authtoken.views import ObtainAuthToken
from ..views import (
    test,
    loginView , 
    logoutView
    )


urlpatterns = [
    path("test/",test) ,
    path('login/', loginView, name='login'),
    path('logout/', logoutView, name='logout'),

]

