from django.urls import path
from . import views
from django.db import router
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'registro_entrada', views.Registro_EntradaViewSet)
router.register(r'registro_pago', views.Registro_PagoViewSet)
router.register(r'registro_entrada_put', views.Registro_EntradaKeysViewSet)
urlpatterns = router.urls


urlpatterns += [
    path('registro_pagos_activos', views.Registro_Pago_ActivoViewSet.as_view()),
    path('registro_entrada', views.Registro_Entrada_ActivoViewSet.as_view()),
    path('registro_is_activate', views.Registro_Entrada_D_ActivoViewSet.as_view()),
    path('cuenta_pago', views.Get_Cuenta_Residente_ViewSet.as_view(
        {'get': 'list'})),
]
