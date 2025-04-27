from django.contrib import admin

from .models import Event, EventMaterial, EventType, Speaker, Topic


# Keep these as they are, since EventType and Topic still have slugs
@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "color_class")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "company")
    search_fields = ("name", "role", "company")


@admin.register(EventMaterial)
class EventMaterialAdmin(admin.ModelAdmin):
    list_display = ("name",)


class EventMaterialInline(admin.TabularInline):
    model = Event.materials.through
    extra = 1


class SpeakerInline(admin.TabularInline):
    model = Event.speakers.through
    extra = 1


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "event_type",
        "topic",
        "date",
        "location",
        "status",
        "is_featured",
    )
    list_filter = ("event_type", "topic", "is_featured")
    search_fields = ("title", "description", "location")
    readonly_fields = ("status",)
    inlines = [SpeakerInline, EventMaterialInline]
    fieldsets = (
        (None, {"fields": ("title", "description", "is_featured")}),
        (
            "Event Details",
            {
                "fields": (
                    "date",
                    "end_date",
                    "event_type",
                    "topic",
                    "duration",
                    "location",
                    "capacity",
                )
            },
        ),
        ("Media", {"fields": ("image", "registration_url")}),
    )
