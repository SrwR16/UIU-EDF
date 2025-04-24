from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoticeViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'notices', NoticeViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]