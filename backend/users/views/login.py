from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import  HTTP_401_UNAUTHORIZED
from rest_framework.request import Request
from django.contrib.auth import  authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from utils.users import get_user_from_request , BaseUser
from ..api.serializers import UserSerializer
from .constants import (
    AUTH_COOKIE ,
    SESSION_ID ,
    CSRF_TOKEN , 
    EXPIRE
)
import datetime

@api_view(["POST"])
def loginView(request: Request):
    user , token = get_user_from_request(request , token=True)
    if isinstance(user , BaseUser):
        serializer_user = UserSerializer(user)
        data = serializer_user.data.copy()
        data.update({AUTH_COOKIE:f"{token}"})
        expiredate = datetime.datetime.utcfromtimestamp(token['exp']).isoformat()
        data.update({EXPIRE:expiredate})
        response = Response(data)
        # response.set_cookie(AUTH_COOKIE,token)
        return response
    else :
        credentials = request.data.copy()
        if "username" in credentials.keys() and "password" in credentials.keys():
            user = authenticate(request, username=credentials['username'] , password=credentials['password'])
            if user :
                token: RefreshToken = RefreshToken.for_user(user)
                serializer_user = UserSerializer(user)
                data = serializer_user.data.copy()
                data.update({AUTH_COOKIE:f"{token.access_token}"})
                expiredate = datetime.datetime.utcfromtimestamp(token.access_token['exp']).isoformat()
                data.update({EXPIRE:expiredate})
                response = Response(data)
                # response.set_cookie(AUTH_COOKIE,token.access_token)
                return response
        return Response({
            "message": f"faild to authenticate you",
        },
        HTTP_401_UNAUTHORIZED
        )

@api_view(["GET" , "POST"])
def logoutView(request: Request):
    response = Response({"message":"Logout successfully"})
    response.delete_cookie(AUTH_COOKIE)
    response.delete_cookie(CSRF_TOKEN)
    response.delete_cookie(SESSION_ID)
    return response


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from ..permissions import IsManager  # Import your custom permission class

# class YourView(APIView):
#     permission_classes = [IsManager]  # Apply the custom permission class to the view

#     def get_object(self, pk):
#         # Your logic to retrieve the object
#         pass

#     def get(self, request, pk):
#         obj = self.get_object(pk)
#         # Check permissions using the custom permission class
#         self.check_object_permissions(request, obj)
#         # Your GET method logic
#         return Response({"data":100})

#     def put(self, request, pk):
#         obj = self.get_object(pk)
#         # Check permissions using the custom permission class
#         self.check_object_permissions(request, obj)
#         # Your PUT method logic
#         return Response({"data":100})

#     def delete(self, request, pk):
#         obj = self.get_object(pk)
#         # Check permissions using the custom permission class
#         self.check_object_permissions(request, obj)
#         # Your DELETE method logic
#         return Response(status=status.HTTP_204_NO_CONTENT)
