from django.db import models
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned

# Player class, once set is added to the DB

class Player(models.Model):
    username = models.CharField(max_length=100, unique=True)
    scores = ArrayField(models.IntegerField(), default=list, blank=True)
    tournaments = models.ManyToManyField('Tournament', related_name='players', blank=True)
    def __str__(self):
        return self.username

# Tournament class, once set is added to the DB 

class Tournament(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()

    def __str__(self):
        return self.name