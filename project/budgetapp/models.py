from django.db import models

# Create your models here.

class BudgetApp(models.Model):
    name = models.CharField(max_length=100)
    amount = models.IntegerField(default=0)
    date = models.DateField()


