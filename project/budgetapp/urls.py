from rest_framework import routers
from .views import BudgetAppView

routers = routers.DefaultRouter()
routers.register('api/budgetapp', BudgetAppView, 'budgetapp')

urlpatterns = routers.urls