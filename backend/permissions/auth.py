from rest_framework.permissions import BasePermission
from utils.users import get_user_from_request

class IsAuthenticated(BasePermission):
    """
    Allows access only to authenticated users.
    using CookieAuthentication
    """

    def has_permission(self, request, view):
        return bool(get_user_from_request(request))
