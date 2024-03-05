from django.apps import AppConfig

class CustomersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'customers'

    def ready(self) -> None:
        from .signals import (
            update_customer_signal ,
            update_subscription_signal
            )

        return super().ready()