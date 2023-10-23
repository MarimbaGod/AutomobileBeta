from django.urls import path
from .views import api_list_salesperson

urlpatterns = [
    path("salespeople/", api_list_salesperson, name="api_list_salesperson"),
]
