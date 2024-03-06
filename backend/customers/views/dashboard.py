from rest_framework.views import Response 
from rest_framework.decorators import api_view , permission_classes
from django.http.request import HttpRequest
from ..api.serializers import CustomerSerializer , DashBoardSubscriptionSerializer , Project
from rest_framework.permissions import IsAuthenticated
from users.models import BaseUser
from utils.users import get_user_from_request

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard(request:HttpRequest):
    user:BaseUser = get_user_from_request(request)
    filters = {}#'customer__project':project
    if user.is_superuser or user.role == user.Role.MANAGER :
        get_params = request.GET.dict()
        if 'project' in get_params.keys():
            project = Project.objects.filter(name=get_params.pop('project')).first()
            if not project :
                filters = {}
            else :
                filters = {'customer__project':project}
        else :
            filters = {}
            
    else :
        filters = {'customer__project':user.project}

    # filters.update({
    #     'user':user
    # })
    # print(f"{filters}")
    data = DashBoardSubscriptionSerializer(filters)
    return Response(data.data)



