from django.contrib import admin
from .models import (
    Project ,
    UserConfig
)
# Register your models here.


admin.site.register(Project)

admin.site.register(UserConfig)