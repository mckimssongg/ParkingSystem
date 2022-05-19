from rest_framework.serializers import ModelSerializer, Serializer
from .models import *


class Registro_EntradaSerializer(ModelSerializer):
    class Meta:
        model = Registro_Entrada
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['fecha_entrada'] = instance.fecha_entrada.strftime(
            "%d/%m/%Y %H:%M:%S")
        representation['fecha_salida'] = instance.fecha_salida.strftime(
            "%d/%m/%Y %H:%M:%S")
        representation['vehiculo'] = instance.vehiculo.placa
        representation['tipo_residencia'] = instance.vehiculo.tipo_residencia.nombre
        representation['estacionamiento'] = instance.estacionamiento.nombre
        representation['a_cargo_de'] = instance.a_cargo_de.username if instance.a_cargo_de else 'No asignado'
        representation['importe_total'] = round(float(tiempo_estacionado_en_minutos(
            instance.fecha_salida, instance.fecha_entrada)) * float(instance.vehiculo.tipo_residencia.tarifa), 2)
        representation['tiempo_estacionado'] = (tiempo_estacionado_en_minutos(
            instance.fecha_salida, instance.fecha_entrada))
        return representation


class Registro_EntradaListSerializer(ModelSerializer):
    class Meta:
        model = Registro_Entrada
        fields = ('id', 'vehiculo', 'fecha_salida',)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['vehiculo'] = instance.vehiculo.placa
        representation['fecha_entrada'] = instance.fecha_entrada.strftime(
            "%d/%m/%Y %H:%M:%S")
        representation['fecha_salida'] = instance.fecha_salida.strftime(
            "%d/%m/%Y %H:%M:%S")
        representation['importe_total'] = round(float(tiempo_estacionado_en_minutos(
            instance.fecha_salida, instance.fecha_entrada)) * float(instance.vehiculo.tipo_residencia.tarifa), 2)
        representation['tiempo_estacionado'] = (tiempo_estacionado_en_minutos(
            instance.fecha_salida, instance.fecha_entrada))
        return representation


class Registro_EntradaKeysSerializer(ModelSerializer):
    class Meta:
        model = Registro_Entrada
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation


class Registro_PagoSerializer(ModelSerializer):
    class Meta:
        model = Registro_Pago
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['vehiculo'] = {
            'id': instance.vehiculo.id,
            'placa': instance.vehiculo.placa,
        }
        data['fecha_pago'] = 'sin cobro' if instance.fecha_pago == instance.created else instance.fecha_pago.strftime(
            "%d/%m/%Y %H:%M:%S")
        registros = Registro_Entrada.objects.filter(
            cuenta_por_cobrar=instance.id)
        data['registro_entrada'] = Registro_EntradaListSerializer(
            registros, many=True).data
        total = 0
        tiempo = 0
        for instance in registros:
            total += round(float(tiempo_estacionado_en_minutos(
                instance.fecha_salida, instance.fecha_entrada)) * float(instance.vehiculo.tipo_residencia.tarifa), 2)
            tiempo += float(tiempo_estacionado_en_minutos(
                instance.fecha_salida, instance.fecha_entrada))
        data['importe'] = total
        data['tiempo_estacionado'] = tiempo

        return data
