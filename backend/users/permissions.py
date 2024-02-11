from rest_framework.permissions import BasePermission
from .models import BaseUser

class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == BaseUser.Role.MANAGER
    
class IsAgent(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == BaseUser.Role.CS | request.user.role == BaseUser.Role.SALES
    
class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser


