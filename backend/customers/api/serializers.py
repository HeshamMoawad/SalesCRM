from rest_framework.serializers import Serializer,  ModelSerializer , SerializerMethodField , CharField
from ..models import Customer , CustomerUpdatesRecord , Subscription , SubscriptionNote , SubscriptionUpdatesRecord , Project
from users.api.serializers import UserSerializer , ProjectSerializer
from django.db.models import Sum , Q ,BooleanField ,ExpressionWrapper , F
from datetime import datetime  , timedelta
from django.utils import timezone


class CustomerUpdatesRecordSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = CustomerUpdatesRecord
        fields = ['user', 'created_at']

class CustomerSerializer(ModelSerializer):
    updates = SerializerMethodField()
    creator = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    subscriptions = SerializerMethodField()
    phone = SerializerMethodField()
    def get_subscriptions(self,obj)->int:
        return Subscription.objects.filter(customer=obj).count()
    def get_updates(self,obj)->dict:
        return CustomerUpdatesRecordSerializer(CustomerUpdatesRecord.objects.filter(customer=obj).all() , many=True).data
    def get_phone(self,obj:Customer):
        return obj.phone[1:]
    class Meta:
        model = Customer
        fields = [
            "uuid",
            "creator",
            "project",
            "updates",
            "name",
            "phone",
            "created_at",
            "subscriptions"
        ]

class SubscriptionUpdatesRecordSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = SubscriptionUpdatesRecord
        fields = ['user', 'created_at']

class SubscriptionNoteSerializer(ModelSerializer):
    creator = UserSerializer(read_only=True)
    class Meta:
        model = SubscriptionNote
        fields = ['note', 'created_at' , 'creator']

class SubscriptionSerializer(ModelSerializer):
    creator = UserSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    cs = UserSerializer(read_only=True)
    updates = SerializerMethodField()
    now = SerializerMethodField()

    def get_updates(self,obj:Subscription):
        return SubscriptionUpdatesRecordSerializer(SubscriptionUpdatesRecord.objects.filter(subscription=obj) , many=True).data

    def get_now(self , obj:Subscription ,*args, **kwargs):
        return datetime.now()
    class Meta:
        model = Subscription
        fields = [
            "uuid",
            "creator",
            "cs" ,
            "customer",
            "text",
            "created_at" ,
            "updates",
            "start_date",
            "end_date" ,
            "price" ,
            "collected_price",
            'deuration' , 
            'now'
        ]

class DashBoardSubscriptionSerializer(Serializer):
    total_prices = SerializerMethodField()
    total_collected = SerializerMethodField()
    subscriptions_count = SerializerMethodField()
    current_subscriptions = SerializerMethodField()
    unpaid_subscriptions = SerializerMethodField()
    ending_soon = SerializerMethodField()

    def get_total_prices(self , *args, **kwargs):
        # filters:dict = args[0]
        # user:BaseUser = filters.pop("user",None)

        # if user
        return  Subscription.objects.filter(**args[0]).aggregate( total_prices=Sum('price'))['total_prices']

    def get_total_collected(self , *args, **kwargs):
        return  Subscription.objects.filter(**args[0]).aggregate(total_prices=Sum('collected_price'))['total_prices']
    
    def get_subscriptions_count(self , *args, **kwargs):
        return Subscription.objects.filter(**args[0]).count()

    def get_current_subscriptions(self, *args, **kwargs):
        return Subscription.objects.annotate(
                is_duration_valid=ExpressionWrapper(
                    Q(end_date__date__gte=datetime.now().date()),
                    output_field=BooleanField()
                )
            ).filter(**args[0],is_duration_valid=True).count()

    def get_unpaid_subscriptions(self, *args, **kwargs):
        return Subscription.objects.annotate(
                is_unpaid_subscription=ExpressionWrapper(
                    Q(price__gt=F('collected_price')),
                    output_field=BooleanField()
                )
            ).filter(**args[0],is_unpaid_subscription=True).count()
    
    def get_ending_soon(self ,  *args, **kwargs):
        return SubscriptionSerializer(Subscription.objects.filter(**args[0] , end_date__lte=timezone.now() + timedelta(days=7)) , many=True).data