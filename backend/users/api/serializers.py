from rest_framework.serializers import  ModelSerializer 
from ..models import BaseUser , Project


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "name",
            "logo",
        ]
class UserSerializer(ModelSerializer):
    project = ProjectSerializer(read_only=True)
    class Meta:
        model = BaseUser
        fields = [
            "username",
            "first_name",
            "project",
            "is_staff",
            "is_active",
            "role",
        ]