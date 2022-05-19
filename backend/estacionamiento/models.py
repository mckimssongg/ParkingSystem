from django.db import models


class Estacionamiento(models.Model):
    nombre = models.CharField(max_length=100)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class Area(models.Model):
    nombre = models.CharField(max_length=100)
    estacionamiento = models.ForeignKey(
        Estacionamiento, on_delete=models.CASCADE)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
