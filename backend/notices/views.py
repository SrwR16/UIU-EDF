from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Category, Notice
from .serializers import CategorySerializer, NoticeSerializer


class NoticeFilter(filters.FilterSet):
    category = filters.CharFilter(field_name="category__slug")
    search = filters.CharFilter(method="search_filter")

    class Meta:
        model = Notice
        fields = ["category"]

    def search_filter(self, queryset, name, value):
        return queryset.filter(title__icontains=value) | queryset.filter(
            content__icontains=value
        )


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = (
        Notice.objects.select_related("category").prefetch_related("attachments").all()
    )
    serializer_class = NoticeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_class = NoticeFilter
    ordering = ["-date"]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    ordering = ["name"]


class CategoryNoticesViewSet(viewsets.ModelViewSet):
    serializer_class = NoticeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        category_id = self.kwargs["category_id"]
        category = get_object_or_404(Category, id=category_id)
        return (
            Notice.objects.filter(category=category)
            .select_related("category")
            .prefetch_related("attachments")
            .order_by("-date")
        )
