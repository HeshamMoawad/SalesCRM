from django.urls import path , include
from .views import (
    loginin,
    )

urlpatterns = [
    path("test",loginin)
]
