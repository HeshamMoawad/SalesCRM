from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.http.request import HttpRequest
from django.conf import settings


class CookieAuthentication(JWTAuthentication):
    def authenticate(self, request:HttpRequest):
        # Get the token from the cookie
        token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        if token is None:
            return None
        try:
            # Validate the token and retrieve user
            validated_token = self.get_validated_token(token)
            user = self.get_user(validated_token)
        except AuthenticationFailed:
            return None

        return (user, validated_token)

class HeaderAuthentication(JWTAuthentication):
    def authenticate(self, request:HttpRequest):
        # Get the token from the cookie
        token = request.headers.get(settings.SIMPLE_JWT["AUTH_HEADER"])
        if token is None:
            return None
        try:
            # Validate the token and retrieve user
            validated_token = self.get_validated_token(token)
            user = self.get_user(validated_token)
        except AuthenticationFailed:
            return None

        return (user, validated_token)



