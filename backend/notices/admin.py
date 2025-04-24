from django.contrib import admin

from .models import Attachment, Category, Notice


class AttachmentInline(admin.StackedInline):
    model = Attachment
    extra = 1


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "created_at")
    search_fields = ("title", "content")
    inlines = [AttachmentInline]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
