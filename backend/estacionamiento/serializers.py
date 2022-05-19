from rest_framework.serializers import ModelSerializer
from .models import Estacionamiento, Area


class AreaSerializer(ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'estacionamiento': instance.estacionamiento.nombre,
            'nombre': instance.nombre,
            'estado': instance.estado,
        }


class EstacionamientoSerializer(ModelSerializer):
    class Meta:
        model = Estacionamiento
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        areas = Area.objects.filter(estacionamiento=instance.id)
        data['areas'] = AreaSerializer(areas, many=True).data
        return data
