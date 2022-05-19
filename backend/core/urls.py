
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('vehiculos/', include('vehiculos.urls')),
    path('estacionamiento/', include('estacionamiento.urls')),
    path('registros/', include('registros.urls')),
]
