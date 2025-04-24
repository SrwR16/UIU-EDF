from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters import rest_framework as filters
from .models import Notice, Category
from .serializers import NoticeSerializer, CategorySerializer

class NoticeFilter(filters.FilterSet):
    category = filters.CharFilter(field_name='category__slug')
    search = filters.CharFilter(method='search_filter')

    class Meta:
        model = Notice
        fields = ['category']

    def search_filter(self, queryset, name, value):
        return queryset.filter(title__icontains=value) | queryset.filter(content__icontains=value)

class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_class = NoticeFilter

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]