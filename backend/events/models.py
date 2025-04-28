from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class EventType(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    color_class = models.CharField(
        max_length=100, default="bg-orange-100 text-orange-800"
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Topic(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Speaker(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    bio = models.TextField()
    image = models.ImageField(upload_to="speakers/")
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.role} at {self.company}"


class EventMaterial(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to="event_materials/")

    def __str__(self):
        return self.name


class Event(models.Model):
    title = models.CharField(max_length=200)
    # No slug field
    date = models.DateTimeField()
    end_date = models.DateTimeField(blank=True, null=True)
    event_type = models.ForeignKey(
        EventType, on_delete=models.CASCADE, related_name="events"
    )
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="events")
    description = models.TextField()
    location = models.CharField(max_length=200)
    capacity = models.PositiveIntegerField()
    registration_url = models.URLField()
    image = models.ImageField(upload_to="events/")
    duration = models.CharField(max_length=50)
    speakers = models.ManyToManyField(Speaker, related_name="events", blank=True)
    materials = models.ManyToManyField(EventMaterial, related_name="events", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # If end_date is not set, use date + duration as an estimate
        if not self.end_date and self.date:
            self.end_date = self.date
        super().save(*args, **kwargs)

    @property
    def status(self):
        now = timezone.now()
        # If event has end_date, use that to determine if it's past
        if self.end_date:
            if self.end_date > now:
                return "upcoming"
            return "past"
        # Otherwise use the start date
        if self.date > now:
            return "upcoming"
        return "past"

    def __str__(self):
        return self.title
