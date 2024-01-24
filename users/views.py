from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from . models import User
from . serializers import RegisterUserSerializer, MyTokenObtainPairSerializer


#Metodo para crear usuarios
@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create(
        email = data['email'],
        name = data['name'],
        last_name = data['last_name'],
        password = make_password(data['password'])
    )
    serializer = RegisterUserSerializer(user, many= False)
    return Response(serializer.data)

#Nos permite hacer el login y nos devuelve el acess token
class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer