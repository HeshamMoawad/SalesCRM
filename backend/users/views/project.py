from rest_framework.views import Response , APIView
from django.http.request import HttpRequest
from utils import get_user_from_request , BaseUser
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import FieldError , ValidationError 
from ..models import Project , CS 
from ..api.serializers import UserSerializer , ProjectSerializer 

class ProjectAPIView(APIView):
    permission_classes = [
        IsAuthenticated ,
    ]

    # Can See
    def get(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        filters = request.GET.dict()
        try : 
            if user.is_superuser or user.role == user.Role.MANAGER :
                projects = Project.objects.filter(**filters).distinct()
                project_serializer = ProjectSerializer(projects , many=True)
                return Response(project_serializer.data)
        except FieldError as e :
            return Response({"message":"please enter corrent field name"})
        except Exception as e :
            return Response({"message":f"{e}"})

class CSAPIView(APIView):
    permission_classes = [
        IsAuthenticated ,
    ]

    # Can See
    def get(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        filters = request.GET.dict()
        try : 
            if user.is_superuser or user.role == user.Role.MANAGER :
                cses = CS.objects.filter(**filters).distinct()
            else :
                cses = CS.objects.filter(project=user.project , **filters).distinct()
            cs_serializer = UserSerializer(cses , many=True)
            return Response(cs_serializer.data)
        except FieldError as e :
            return Response({"message":"please enter corrent field name"})
        except Exception as e :
            return Response({"message":f"{e}"})

