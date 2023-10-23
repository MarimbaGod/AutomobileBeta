from django.contrib import admin
from .models import Salesperson


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    list_display = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]
