from rest_framework import serializers
from .models import Notice, Category, Attachment

class AttachmentSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Attachment
        fields = ['name', 'url']
    
    def get_url(self, obj):
        return obj.file.url

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class NoticeSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    attachments = AttachmentSerializer(many=True, read_only=True)
    date = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Notice
        fields = ['id', 'title', 'content', 'date', 'category', 'attachments']