from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.request import Request


@api_view(["POST"])
def test(request: Request):
    return Response({})
