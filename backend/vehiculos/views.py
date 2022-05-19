
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, generics


from .models import Tipo_Residencia, Vehiculo
from .serializers import Tipo_ResidenciaSerializer, VehiculoSerializer


class VehiculosEntradaView(generics.ListAPIView):
    '''
    Query para obtener todos los vehiculos que tengan una relacion con un registro de entrada
    '''
    queryset = Vehiculo.objects.filter(
        registro_entrada__estado_de_salida=False)
    serializer_class = VehiculoSerializer


class Vehiculos_EstadoViewSet(generics.ListAPIView):
    '''
    Para obtener los vehiculos que estan activos o inactivos
    '''
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

    def get_queryset(self):
        queryset = Vehiculo.objects.all()
        estado = self.request.query_params.get('estado', None)
        if estado is not None:
            queryset = queryset.filter(estado=estado)
        return queryset


class Tipo_ResidenciaViewSet(viewsets.ModelViewSet):
    queryset = Tipo_Residencia.objects.all()
    serializer_class = Tipo_ResidenciaSerializer

    def destroy(self, request, *args, **kwargs):
        tipos = self.get_object()
        tipos.delete()

        return Response({"message": "El tipo fue eliminado"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        tipos = self.get_object()
        tipos_data = request.data
        tipos_serializer = Tipo_ResidenciaSerializer(
            instance=tipos, data=tipos_data)
        if tipos_serializer.is_valid():
            tipos_serializer.save()
            return Response(tipos_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(tipos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)


class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

    def destroy(self, request, *args, **kwargs):
        vehiculos = self.get_object()
        vehiculos.delete()

        return Response({"message": "El vehiculo fue eliminado"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        vehiculos = self.get_object()
        vehiculos_data = request.data
        vehiculos_serializer = VehiculoSerializer(
            instance=vehiculos, data=vehiculos_data)
        if vehiculos_serializer.is_valid():
            vehiculos_serializer.save()
            return Response(vehiculos_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(vehiculos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)
