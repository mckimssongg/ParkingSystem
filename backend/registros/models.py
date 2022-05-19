from django.db import models
from users.models import User
from estacionamiento.models import Estacionamiento, Area
from vehiculos.models import Vehiculo
from datetime import timezone


def tiempo_estacionado_en_minutos(fecha_salida, fecha_entrada):
    '''
    Calcula el tiempo que el vehiculo estuvo estacionado en minutos
    '''
    tiempo_estacionado = (fecha_salida -
                          fecha_entrada).seconds / 60
    return tiempo_estacionado


class Registro_Pago(models.Model):

    vehiculo = models.ForeignKey(
        Vehiculo, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    fecha_pago = models.DateTimeField(auto_now=True)
    importe = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, blank=True, null=True)

    tiempo_estacionado = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    fin_mes = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.vehiculo.placa


class Registro_Entrada(models.Model):

    estacionamiento = models.ForeignKey(
        Area, on_delete=models.CASCADE)

    vehiculo = models.ForeignKey(
        Vehiculo, on_delete=models.CASCADE)

    a_cargo_de = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)

    estado_de_salida = models.BooleanField(
        default=False, blank=True, null=True)

    cuenta_por_cobrar = models.ForeignKey(
        Registro_Pago, on_delete=models.CASCADE, null=True, blank=True)

    fecha_entrada = models.DateTimeField(auto_now_add=True)

    fecha_salida = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.vehiculo.placa
