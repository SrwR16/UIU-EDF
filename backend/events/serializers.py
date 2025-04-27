from rest_framework import serializers

from .models import Event, EventMaterial, EventType, Speaker, Topic


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ["id", "name", "slug", "color_class"]


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ["id", "name", "slug"]


class SpeakerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Speaker
        fields = [
            "id",
            "name",
            "role",
            "company",
            "bio",
            "image",
            "linkedin",
            "twitter",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return (
                request.build_absolute_uri(obj.image.url) if request else obj.image.url
            )
        return None


class EventMaterialSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = EventMaterial
        fields = ["id", "name", "url"]

    def get_url(self, obj):
        request = self.context.get("request")
        if obj.file and hasattr(obj.file, "url"):
            return request.build_absolute_uri(obj.file.url) if request else obj.file.url
        return None


class EventSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source="event_type.name")
    topic_name = serializers.CharField(source="topic.name")
    speakers = SpeakerSerializer(many=True, read_only=True)
    materials = EventMaterialSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "date",
            "type",
            "topic_name",
            "description",
            "location",
            "capacity",
            "registration_url",
            "image",
            "duration",
            "speakers",
            "materials",
            "status",
            "is_featured",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return (
                request.build_absolute_uri(obj.image.url) if request else obj.image.url
            )
        return None
