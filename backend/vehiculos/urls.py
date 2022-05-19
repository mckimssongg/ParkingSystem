from django.urls import path
from . import views
from django.db import router
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'tipos', views.Tipo_ResidenciaViewSet)
router.register(r'vehiculos', views.VehiculoViewSet)

urlpatterns = router.urls


urlpatterns += [
    path('vehiculos/entrada', views.VehiculosEntradaView.as_view()),
    path('vehiculos/filter', views.Vehiculos_EstadoViewSet.as_view()),
]
