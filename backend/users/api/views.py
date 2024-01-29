from django.contrib.auth import login , logout , authenticate
from rest_framework.response import Response
from rest_framework.request import HttpRequest
from rest_framework.decorators import api_view



@api_view(["POST"])
def loginin(request:HttpRequest):
    username = request.POST.get("username")
    password = request.POST.get("password")
    try :
        user = authenticate(request,username=username,password=password)
        print(user)
        login(request,user)
        return Response({})
    except Exception as e:
        return Response({"error" : f"{e}"})