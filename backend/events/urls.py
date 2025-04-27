from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import EventTypeViewSet, EventViewSet, SpeakerViewSet, TopicViewSet

router = DefaultRouter()
router.register("types", EventTypeViewSet)
router.register("topics", TopicViewSet)
router.register("speakers", SpeakerViewSet)
router.register("", EventViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
