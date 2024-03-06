from django.contrib import admin
from django.urls import path , include
from django.conf import settings
import re
from urllib.parse import urlsplit
from django.core.exceptions import ImproperlyConfigured
from django.urls import re_path
from django.views.static import serve

def static(prefix, view=serve, **kwargs):
    if not prefix:
        raise ImproperlyConfigured("Empty static prefix not permitted")
    elif urlsplit(prefix).netloc:
        # No-op if not in debug mode or a non-local prefix.
        return []
    return [
        re_path(r'^%s(?P<path>.*)$' % re.escape(prefix.lstrip('/')), view, kwargs=kwargs),
    ]


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/",include("users.api.urls")) ,
    path("api/",include("customers.api.urls")) ,

]    
urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
urlpatterns  += [
    path('', include("home.urls")) ,
]
