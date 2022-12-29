from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BudgetAppSerializer
from .models import BudgetApp
# Create your views here.

class BudgetAppView(viewsets.ModelViewSet):
    serializer_class = BudgetAppSerializer
    queryset = BudgetApp.objects.all()