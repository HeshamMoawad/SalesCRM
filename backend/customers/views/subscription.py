from rest_framework.views import Response  , APIView
from django.http.request import HttpRequest
from utils import get_user_from_request , BaseUser
from permissions import UserCrudSubscriptionPermissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Customer , Subscription
from users.models import CS
from ..api.serializers import SubscriptionSerializer , SubscriptionNote , SubscriptionNoteSerializer
from ..api.pagination import CustomPagination
from django.core.exceptions import FieldError , ValidationError 
from django.db.utils import IntegrityError

class SubscriptionAPIView(APIView):
    permission_classes = [
        IsAuthenticated ,
        UserCrudSubscriptionPermissions
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
                subscriptions = Subscription.objects.filter(**filters)
            else :
                subscriptions = Subscription.objects\
                    .filter(creator=user ,**filters).distinct() | Subscription.objects\
                        .filter(cs=user , **filters).distinct() #| Subscription.objects\
                            #.filter(customer__creator=user , **filters).distinct()

            # Paginate the queryset
            subscriptions = subscriptions.order_by('-created_at')
            paginator = self.pagination_class()
            result_page = paginator.paginate_queryset(subscriptions, request)

            subscriptions_serializer = SubscriptionSerializer(result_page , many=True)
            # return Response(subscriptions_serializer.data)
            return paginator.get_paginated_response(subscriptions_serializer.data)
        except FieldError as e :
            return Response({"message":"please enter correct field name"})
        except Exception as e :
            return Response({"message":f"{e}"})

    # Add new
    def post(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        data:dict = request.data
        data.pop('uuid' , None)
        if "customer_uuid" not in data.keys():
            return Response({"message": "please enter customer_uuid to create subsciption"})

        unchangable = ["uuid","created_at","id","creator"]
        if not (user.role == user.Role.MANAGER or user.is_superuser) :
            unchangable.append("is_deleted")
        new_data = {}
        for key , value in data.items():
            if key not in unchangable:
                new_data.update({
                    key : value
                })
        if new_data.get('price',1) < new_data.get('collected_price',0):
            return Response({"message":"Please correct the price field"})
        if new_data.get('start_date',None) == new_data.get('end_date',None):
            return Response({"message":"Please check Date fields"})

        try :
            customer = Customer.objects.get(uuid=new_data.pop('customer_uuid'))
            new_data.update({
                "creator":user ,
                "customer" :customer 
            })
            if 'cs' in data.keys():
                cs = CS.objects.get(username=new_data.pop('cs'))
                if cs.project != customer.project:
                    return Response({"message":"Please add correct cs for this customer"})
                new_data.update({
                    'cs':cs ,
                })
        except Customer.DoesNotExist :
            return Response({"message": "customer you tried to add subscription did not found"})
        except CS.DoesNotExist :
            return Response({"message": "cs you tried to add subscription for not found"})  
        subscription = Subscription(**new_data)
        try :
            if user.is_superuser or user.role == user.Role.MANAGER :
             
                pass
            else :
                if user != subscription.customer.creator:
                    return Response({"message": "you haven't permisstion to add subscription for this customer "})
            subscription.check()
            subscription.validate_unique()
            self.check_object_permissions(request,subscription)
            subscription.save(user=user)
            return Response(SubscriptionSerializer(subscription).data)
        # except ValidationError as e:
        #     return Response({"message": f"{e.error_dict['__all__'][0]}"})
        except IntegrityError :
            return Response({"message": "IntegrityError \nthis Subscription is already exist"})
        except PermissionDenied as e :
            return Response({"message": f"{e}"})
        # except Exception as e :
        #     return Response({"message": f"Unknown Error \n {e}"})


    # update 
    def put(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        data:dict = request.data
        print(data)
        if 'uuid' not in data.keys():
            return Response({"message":"uuid must be in request to get subscription and update it"})
        try :
            unchangable = ["uuid","created_at","id","creator" ,"customer" ,'start_date']
            subscription = Subscription.objects.get(uuid=data.pop("uuid") )
            if user.is_superuser :...
            else : data.pop("start_date",None)
            self.check_object_permissions(request,subscription)
            cs = CS.objects.get(username=data.pop("cs"))
            if cs.project != subscription.customer.project :
                return  Response({"message":"Please add correct cs for this customer"})
            else :
                subscription.cs = cs
            for key, value in data.items():
                if key not in unchangable:
                    setattr(subscription, key, value)
            print("\nwill save\n")
            subscription.save(user=user , created=False)
            return Response(SubscriptionSerializer(subscription).data)
        except Customer.DoesNotExist :
            return Response({"message":"customer with this uuid not found"})
        except CS.DoesNotExist :
            return Response({"message":"CS with this uuid not found"})
        except ValidationError as e:
            return Response({"message": f"{e.error_dict['__all__'][0]}"})
        except IntegrityError :
            return Response({"message": "IntegrityError \nthis customer is already exist"})
        except PermissionDenied as e :
            return Response({"message": f"{e}"})
        except Exception as e :
            return Response({"message": f"Unknown Error \n {e}"})


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


class NotesAPIView(APIView):
    permission_classes = [
        IsAuthenticated ,
        UserCrudSubscriptionPermissions
    ]
    # Can See
    def get(self,request:HttpRequest):
        # user:BaseUser = get_user_from_request(request)
        filters = request.GET.dict()
        if 'subscription_uuid' not in filters.keys():
            return Response({"message": "please enter subscription_uuid to get Notes"})
        try : 
            subscription = Subscription.objects.get(uuid=filters.pop('subscription_uuid'))
            notes = SubscriptionNote.objects.filter(subscription=subscription,**filters).distinct()
            notes_serializer = SubscriptionNoteSerializer(notes , many=True)
            return Response(notes_serializer.data)
        except FieldError as e :
            return Response({"message":"please enter corrent field name"})
        except Subscription.DoesNotExist :
            return Response({"message":"Subscription with this uuid not found"})
        except ValidationError as e:
            return Response({"message": f"{e.error_dict['__all__'][0]}"})
        except Exception as e :
            return Response({"message":f"{e}"})

    # Add new
    def post(self,request:HttpRequest):
        user:BaseUser = get_user_from_request(request)
        data:dict = request.data
        if "subscription_uuid" not in data.keys():
            return Response({"message": "please enter subscription_uuid to create Note"})
        try :
            data.update({
                "creator":user ,
                "subscription" : Subscription.objects.get(uuid=data.pop('subscription_uuid'))
            })
        except Subscription.DoesNotExist :
            return Response({"message": "subscription you tried to add note did not found"})
        note = SubscriptionNote(**data)
        try :
            note.check()
            note.validate_unique()
            note.save(user=user)
            return Response(SubscriptionNoteSerializer(note).data)
        except ValidationError as e:
            return Response({"message": f"{e.error_dict['__all__'][0]}"})
        except IntegrityError :
            return Response({"message": "IntegrityError \nthis Subscription is already exist"})
        except PermissionDenied as e :
            return Response({"message": f"{e}"})
        except Exception as e :
            return Response({"message": f"Unknown Error\n{e}"})

