from rest_framework import serializers
from .models import BudgetApp

class BudgetAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetApp
        fields = ('id','name', 'amount', 'date')