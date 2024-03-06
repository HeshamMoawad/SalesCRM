from users.authentication import CookieAuthentication , HeaderAuthentication
from users.models import BaseUser
import typing

def get_fieldsets(name:str):
    return (
        (f"Login Details ({name})", {
            "fields": (
                "username",
                "_password"
            ),
        }),
        ( "Other Details" ,
            {
                "fields" : (
                    "first_name" ,
                    "project"
                )
            }
        )
    )



def get_user_from_request(request,auth_class=HeaderAuthentication,token=False)-> typing.Optional[BaseUser]:
    auth = auth_class().authenticate(request)
    if auth :
        if token :
            return auth
        return auth[0]

    if token :
        return None , None
    return None
