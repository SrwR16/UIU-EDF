from django.db import models
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Event, EventType, Speaker, Topic
from .serializers import (
    EventSerializer,
    EventTypeSerializer,
    SpeakerSerializer,
    TopicSerializer,
)


class EventTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing event types."""

    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer


class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing topics."""

    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class SpeakerViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing speakers."""

    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing events."""

    queryset = Event.objects.all().order_by("-date")
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["event_type__id", "topic__id", "is_featured"]
    search_fields = ["title", "description", "location"]

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get("status", None)

        if status == "upcoming":
            # Event is upcoming if:
            # - it has an end_date and that date is in the future, OR
            # - it has no end_date and its start date is in the future
            queryset = queryset.filter(
                models.Q(end_date__gt=timezone.now())
                | (models.Q(end_date__isnull=True) & models.Q(date__gt=timezone.now()))
            )
        elif status == "past":
            # Event is past if:
            # - it has an end_date and that date is in the past, OR
            # - it has no end_date and its start date is in the past
            queryset = queryset.filter(
                models.Q(end_date__lte=timezone.now())
                | (models.Q(end_date__isnull=True) & models.Q(date__lte=timezone.now()))
            )

        return queryset

    @action(detail=False)
    def past(self, request):
        now = timezone.now()
        print(f"Current time: {now}, finding past events")
        past_events = self.get_queryset().filter(date__lt=now)
        print(f"Found {past_events.count()} past events")
        serializer = self.get_serializer(past_events, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def upcoming(self, request):
        now = timezone.now()
        print(f"Current time: {now}, finding upcoming events")
        upcoming_events = self.get_queryset().filter(date__gte=now)
        print(f"Found {upcoming_events.count()} upcoming events")
        serializer = self.get_serializer(upcoming_events, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def featured(self, request):
        featured = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def types(self, request):
        types = EventType.objects.all()
        serializer = EventTypeSerializer(types, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def topics(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)
