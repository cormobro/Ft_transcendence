from django.contrib import admin
from .models import Player, Tournament #add Matches

admin.site.register(Player)
admin.site.register(Tournament)
# admin.site.register(Matches)

# Register your models here.
