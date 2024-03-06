from django.urls import path ,re_path
from .views import home


urlpatterns = [
    path('',home),
    re_path(r'^$',home),
    re_path(r'^(?:.*)/?$',home),
]
