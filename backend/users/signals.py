from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import (
    User,
    UserConfig
)


@receiver(post_save, sender=User )
def createUserConfigSignal(sender:User , instance:User , created:bool , **kwargs):
    # print(instance)
    if created:
        config = { "user" : instance}
        if instance.is_superuser :
            config.update({"is_manager":True})
        configObj = UserConfig.objects.create(**config)
    




