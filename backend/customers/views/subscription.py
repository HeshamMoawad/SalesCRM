from rest_framework.views import Response , Request , APIView
from django.http.request import HttpRequest
from utils import get_user_from_request , BaseUser
from permissions import UserCrudPermissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Customer , Subscription
from ..api.serializers import SubscriptionSerializer
from django.core.exceptions import FieldError , ValidationError 
from django.db.utils import IntegrityError

class SubscriptionAPIView(APIView):
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
                subscriptions = Subscription.objects.filter(**filters)
            else :
                subscriptions = Subscription.objects\
                    .filter(creator=user ,**filters).distinct() | Subscription.objects\
                        .filter(cs=user , **filters).distinct() | Subscription.objects\
                            .filter(customer__creator=user , **filters).distinct()
            subscriptions_serializer = SubscriptionSerializer(subscriptions , many=True)
            return Response(subscriptions_serializer.data)
        except FieldError as e :
            return Response({"message":"please enter corrent field name"})
        except Exception as e :
            return Response({"message":f"{e}"})

    # Add new
    def post(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        data:dict = request.data
        if "customer_uuid" not in data.keys():
            return Response({"message": "please enter customer_uuid to create subsciption"})
        try :
            data.update({
                "creator":user ,
                "customer" : Customer.objects.get(uuid=data['customer_uuid'])
            })
        except Customer.DoesNotExist :
            return Response({"message": "customer you tried to add subscription did not found"})
        subscription = Subscription(**data)
        try :
            if user != subscription.customer.creator:
                raise PermissionDenied("you haven't permisstion to add subscription for this customer ")
            subscription.check()
            subscription.validate_unique()
            self.check_object_permissions(request,subscription)
            subscription.save()
            return Response(SubscriptionSerializer(subscription).data)
        except ValidationError as e:
            return Response({"message": f"{e.error_dict['__all__'][0]}"})
        except IntegrityError :
            return Response({"message": "IntegrityError \nthis Subscription is already exist"})
        except PermissionDenied as e :
            return Response({"message": f"{e}"})
        except Exception as e :
            return Response({"message": f"Unknown Error\n{e}"})


    # update 
    def put(self,request:HttpRequest):
        data:dict = request.data
        if 'uuid' not in data.keys():
            return Response({"message":"uuid must be in request to get subscription and update it"})
        try :
            unchangable = ["uuid","created_at","id","creator" ,"customer"]
            subscription = Subscription.objects.get(uuid=data["uuid"] )
            self.check_object_permissions(request,subscription)
            for key, value in data.items():
                if key not in unchangable:
                    setattr(subscription, key, value)
            subscription.save()
            return Response(SubscriptionSerializer(subscription).data)
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
        if 'uuid' not in data.keys():
            return Response({"message":"uuid must be in request to get customer and delete it"})
        try :
            subscription = Subscription.objects.get(uuid=data["uuid"])
            self.check_object_permissions(request,subscription)
            subscription.delete()
            return Response(SubscriptionSerializer(subscription).data)
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


    

