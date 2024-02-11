from rest_framework.serializers import  ModelSerializer , SerializerMethodField
from ..models import Customer , UpdatesRecord


class UpdatesRecordSerializer(ModelSerializer):
    class Meta:
        model = UpdatesRecord
        fields = ['user', 'created_at']

class CustomerSerializers(ModelSerializer):
    updates = UpdatesRecordSerializer(many=True, read_only=True)
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