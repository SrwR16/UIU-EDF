from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


def validate_pdf(value):
    if not value.name.endswith(".pdf"):
        raise ValidationError("Only PDF files are allowed.")


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Notice(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return self.title


class Attachment(models.Model):
    notice = models.ForeignKey(
        Notice, related_name="attachments", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to="notices/attachments/", validators=[validate_pdf])
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
