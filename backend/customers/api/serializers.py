from rest_framework.serializers import  ModelSerializer , SerializerMethodField
from ..models import Customer , CustomerUpdatesRecord , Subscription , SubscriptionNote , SubscriptionUpdatesRecord
from users.api.serializers import UserSerializer , ProjectSerializer

class CustomerUpdatesRecordSerializer(ModelSerializer):
    class Meta:
        model = CustomerUpdatesRecord
        fields = ['user', 'created_at']

class CustomerSerializer(ModelSerializer):
    updates = CustomerUpdatesRecordSerializer(many=True, read_only=True)
    creator = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
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
        ]

class SubscriptionUpdatesRecordSerializer(ModelSerializer):
    class Meta:
        model = SubscriptionUpdatesRecord
        fields = ['user', 'created_at']

class SubscriptionNoteSerializer(ModelSerializer):
    class Meta:
        model = SubscriptionNote
        fields = ['note', 'created_at' , 'creator']

class SubscriptionSerializer(ModelSerializer):
    creator = UserSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    cs = UserSerializer(read_only=True)
    notes = SerializerMethodField()
    updates = SerializerMethodField()

    def get_updates(self,obj:Subscription):
        return SubscriptionUpdatesRecordSerializer(SubscriptionUpdatesRecord.objects.filter(subscription=obj) , many=True).data

    def get_notes(self , obj:Subscription):
        return SubscriptionNoteSerializer(SubscriptionNote.objects.filter(subscription=obj) , many=True).data

    class Meta:
        model = Subscription
        fields = [
            "uuid",
            "creator",
            "cs" ,
            "customer",
            "notes",
            "created_at" ,
            "updates",
            "start_date",
            "end_date" ,
            "price" ,
            "collected_price",
        ]
