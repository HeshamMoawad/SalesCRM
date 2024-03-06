from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Customer , CustomerUpdatesRecord , Subscription , SubscriptionUpdatesRecord



@receiver(post_save , sender=Customer)
def update_customer_signal(sender , instance:Customer , created , **kwargs):
    print(kwargs)
    if not created :
        new_update = CustomerUpdatesRecord(
            user=instance.saver , 
            customer = instance
        )
        new_update.save()

@receiver(post_save , sender=Subscription)
def update_subscription_signal(sender , instance:Subscription , created , **kwargs):
    print(kwargs , instance.saver)
    if not created :
        new_update = SubscriptionUpdatesRecord(
            user=instance.saver , 
            subscription = instance
        )
        new_update.save()

