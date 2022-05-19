from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .serializers import *
from .models import *


class LoginView(APIView):
    '''
    Clase para el login de usuarios
    '''

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserListSerializer(user).data,
            'token': token,
            'auth': True
        }
        return Response(data, status=status.HTTP_201_CREATED)


class UsersListViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()

        return Response({"message": "El usuario fue eliminado"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user_data = request.data
        user_serializer = UserSerializer(
            instance=user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)


class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

    def destroy(self, request, *args, **kwargs):
        facturas = self.get_object()
        facturas.delete()

        return Response({"message": "El rol fue eliminado"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        facturas = self.get_object()
        facturas_data = request.data
        facturas_serializer = FacturaSerializer(
            instance=facturas, data=facturas_data)
        if facturas_serializer.is_valid():
            facturas_serializer.save()
            return Response(facturas_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(facturas_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)
