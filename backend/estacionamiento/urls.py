from django.urls import path
from . import views
from django.db import router
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'areas', views.AreaViewSet)
router.register(r'estacionamientos', views.EstacionamientoViewSet)

urlpatterns = router.urls
