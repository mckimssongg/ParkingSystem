from django.db import models


class Tipo_Residencia(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(max_length=200)
    tarifa = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.nombre


class Vehiculo(models.Model):
    placa = models.CharField(max_length=7, unique=True)
    tipo_vehiculo = models.CharField(max_length=50)
    tipo_residencia = models.ForeignKey(
        Tipo_Residencia, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=100)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.placa
