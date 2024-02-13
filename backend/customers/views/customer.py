from rest_framework.views import Response , Request , APIView
from django.http.request import HttpRequest
from utils import get_user_from_request , BaseUser
from permissions import UserCrudPermissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Customer
from ..api.serializers import CustomerSerializers
from django.core.exceptions import FieldError , ValidationError 
from django.db.utils import IntegrityError

class CustomerAPIView(APIView):
    permission_classes = [
        IsAuthenticated ,
        UserCrudPermissions
    ]

    # Can See
    def get(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        filters = request.GET.dict()
        try : 
            if user.is_superuser or user.role == user.Role.MANAGER :
                customers = Customer.objects.filter(**filters)
            else :
                customers = Customer.objects.filter(creator=user ,is_deleted=False ,**filters  ) | Customer.objects.filter(cs=user ,is_deleted=False, **filters)
            customer_serializer = CustomerSerializers(customers , many=True)
            return Response(customer_serializer.data)
        except FieldError as e :
            return Response({"message":"please enter corrent field name"})
        except Exception as e :
            return Response({"message":f"{e}"})

    # Add new
    def post(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        data:dict = request.data
        data.update({
            "creator":user ,
            "project" : user.project
        })
        new_customer = Customer(**data)
        try :
            new_customer.check()
            new_customer.validate_unique()
            self.check_object_permissions(request,new_customer)
            new_customer.save()
            return Response(CustomerSerializers(new_customer).data)
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
            customer.save()
            return Response(CustomerSerializers(customer).data)
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
        user:BaseUser = get_user_from_request(request)
        data:dict = request.data
        if 'uuid' not in data.keys():
            return Response({"message":"uuid must be in request to get customer and delete it"})
        try :
            customer = Customer.objects.get(uuid=data["uuid"])
            self.check_object_permissions(request,customer)
            customer.delete()
            return Response(CustomerSerializers(customer).data)
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


    

