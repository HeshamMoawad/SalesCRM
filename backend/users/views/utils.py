from ..authentication import CookieAuthentication
from ..models import BaseUser
import typing


def get_user_from_request(request,auth_class=CookieAuthentication)-> typing.Optional[BaseUser]:
    auth = auth_class().authenticate(request)
    if auth :
        return auth[0]
    return None