from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CategoryNoticesViewSet, CategoryViewSet, NoticeViewSet

router = DefaultRouter()
router.register(r"notices", NoticeViewSet)
router.register(r"categories", CategoryViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "notices/categories/<int:category_id>/",
        CategoryNoticesViewSet.as_view({"get": "list"}),
        name="category-notices",
    ),
]
