from rest_framework.views import Response , Request , APIView
from django.http.request import HttpRequest
from utils import get_user_from_request , BaseUser
from permissions import UserCrudCustomerPermissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Customer 
from ..api.serializers import CustomerSerializer
from django.core.exceptions import FieldError , ValidationError 
from django.db.utils import IntegrityError
from ..api.pagination import CustomPagination
from users.models import Project

class CustomerAPIView(APIView):
    permission_classes = [
        IsAuthenticated ,
        UserCrudCustomerPermissions
    ]
    pagination_class = CustomPagination

    # Can See
    def get(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        filters = request.GET.dict()
        filters.pop(self.pagination_class.page_query_param,None)
        filters.pop(self.pagination_class.page_size_query_param,None)

        try : 
            if user.is_superuser or user.role == user.Role.MANAGER :
                customers = Customer.objects.filter(**filters).distinct()
            else :
                customers = Customer.objects\
                    .filter(creator=user ,project=user.project, is_deleted=False , **filters )\
                        .distinct() | Customer.objects\
                            .filter(is_deleted=False ,project=user.project, subscription_customer__cs=user)\
                                .distinct() 
            customers = customers.order_by('-created_at')
            paginator = self.pagination_class()
            result_page = paginator.paginate_queryset(customers, request)
            customer_serializer = CustomerSerializer(result_page , many=True)
            # return Response(customer_serializer.data)
            return paginator.get_paginated_response(customer_serializer.data)
        except FieldError as e :
            return Response({"message":"please enter corrent field name"})
        except Exception as e :
            return Response({"message":f"{e}"})

    # Add new
    def post(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        data:dict = request.data
        if user.is_superuser or user.role == user.Role.MANAGER :
            project_name = data.pop("project",None)
            if project_name :
                project = Project.objects.get(name=project_name)
                user.project = project
        
        unchangable = ["uuid","created_at","id","creator"]
        if not (user.role == user.Role.MANAGER or user.is_superuser) :
            unchangable.append("is_deleted")

        new_data = {}
        for key , value in data.items():
            if key not in unchangable:
                new_data.update({
                    key : value
                })
        new_data.update({
            "creator":user ,
            "project" : user.project 
        })

        new_customer = Customer(**new_data)
        try :
            new_customer.check()
            new_customer.validate_unique()
            self.check_object_permissions(request,new_customer)
            new_customer.save(user=user)
            return Response(CustomerSerializer(new_customer).data)
        except ValidationError as e:
            return Response({"message": f"{e.error_dict['__all__'][0]}"})
        except IntegrityError :
            return Response({"message": "IntegrityError \nthis customer is already exist"})
        except PermissionDenied as e :
            return Response({"message": f"{e}"})
        except Exception as e :
            return Response({"message": f"Unknown Error\n{e}"})


    # update 
    def put(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        data:dict = request.data
        if 'uuid' not in data.keys():
            return Response({"message":"uuid must be in request to get customer and update it"})
        try :
            filters = {}
            unchangable = ["uuid","created_at","id","creator"]
            if not (user.role == user.Role.MANAGER or user.is_superuser) :
                filters.update({"is_deleted":False})
                unchangable.append("is_deleted")
            customer = Customer.objects.get(uuid=data["uuid"] ,**filters )
            for key, value in data.items():
                if key not in unchangable:
                    setattr(customer, key, value)
            self.check_object_permissions(request,customer)
            customer.save(user=user)
            return Response(CustomerSerializer(customer).data)
        except Customer.DoesNotExist :
            return Response({"message":"customer with this uuid not found"})
        except ValidationError as e:
            return Response({"message": f"{e.error_dict['__all__'][0]}"})
        except IntegrityError :
            return Response({"message": "IntegrityError \nthis customer is already exist"})
        except PermissionDenied as e :
            return Response({"message": f"{e}"})
        except Exception as e :
            return Response({"message": f"Unknown Error\n{e}"})


    # delete
    def delete(self,request:HttpRequest):
        data:dict = request.data
        query = request.META.get("QUERY_STRING" , None)
        if query != None :
            data.update({
                "uuid":query.split("=")[-1]
            })
        if 'uuid' not in data.keys():
            return Response({"message":"uuid must be in request to get customer and delete it"})
        try :
            customer = Customer.objects.get(uuid=data["uuid"])
            self.check_object_permissions(request,customer)
            customer.delete()
            return Response(CustomerSerializer(customer).data)
        except Customer.DoesNotExist :
            return Response({"message":"customer with this uuid not found"})
        except ValidationError as e:
            return Response({"message": f"{e.error_dict['__all__'][0]}"})
        except IntegrityError :
            return Response({"message": "IntegrityError \nthis customer is already exist"})
        except PermissionDenied as e :
            return Response({"message": f"{e}"})
        except Exception as e :
            return Response({"message": f"Unknown Error\n{e}"})


    

