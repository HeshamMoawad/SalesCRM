from rest_framework.permissions import BasePermission
from users.models import BaseUser 
from customers.models import Customer , Subscription
from utils.users import get_user_from_request
from django.http.request import HttpRequest

class UserCrudPermissions(BasePermission):
        
    def has_object_permission(self, request:HttpRequest, view, obj:Customer):
        user = get_user_from_request(request)
        if request.method == "GET" : # see obj
            return self.check_fetch(user,obj)
        elif request.method == "POST" : # create new
            return True
        elif request.method == "PUT": # update obj
            return self.check_update(user,obj)
        elif request.method == "DELETE": # delete obj
            return self.is_user_manager(user)
        return False

    def is_user_manager(self, user:BaseUser): 
        if user.is_superuser or user.role == user.Role.MANAGER :
            return True
        return False        

    def check_fetch(self, user:BaseUser , obj:Customer): 
        if self.is_user_manager(user):
            return True
        elif user.role == user.Role.SALES or user.role == user.Role.CS:
            return user == obj.creator
        return False

    def check_update(self, user:BaseUser , obj:Customer ):
        if self.is_user_manager(user):
            return True
        elif user.role == user.Role.SALES or user.role == user.Role.CS:
            return user == obj.creator
        return False

