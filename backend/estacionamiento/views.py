
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets


from .models import Estacionamiento, Area
from .serializers import AreaSerializer, EstacionamientoSerializer


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

    def destroy(self, request, *args, **kwargs):
        areas = self.get_object()
        areas.delete()

        return Response({"message": "El area fue eliminado"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        areas = self.get_object()
        areas_data = request.data
        areas_serializer = AreaSerializer(
            instance=areas, data=areas_data)
        if areas_serializer.is_valid():
            areas_serializer.save()
            return Response(areas_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(areas_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)


class EstacionamientoViewSet(viewsets.ModelViewSet):
    queryset = Estacionamiento.objects.all()
    serializer_class = EstacionamientoSerializer

    def destroy(self, request, *args, **kwargs):
        estacionamientos = self.get_object()
        estacionamientos.delete()

        return Response({"message": "El estacionamiento fue eliminado"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        estacionamientos = self.get_object()
        estacionamientos_data = request.data
        estacionamientos_serializer = EstacionamientoSerializer(
            instance=estacionamientos, data=estacionamientos_data)
        if estacionamientos_serializer.is_valid():
            estacionamientos_serializer.save()
            return Response(estacionamientos_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(estacionamientos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)
