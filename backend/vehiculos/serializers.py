from rest_framework.serializers import ModelSerializer
from .models import Tipo_Residencia, Vehiculo


class Tipo_ResidenciaSerializer(ModelSerializer):
    class Meta:
        model = Tipo_Residencia
        fields = '__all__'


class VehiculoSerializer(ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['tipo_residencia'] = instance.tipo_residencia.nombre
        return data
