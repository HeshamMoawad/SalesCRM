from rest_framework.permissions import BasePermission
from ..users.models import BaseUser

class IsManager(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser :
            return True
        return request.user.role == BaseUser.Role.MANAGER 
    
class IsAgent(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser :
            return True
        return request.user.role == BaseUser.Role.CS or request.user.role == BaseUser.Role.SALES 
    
class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser


