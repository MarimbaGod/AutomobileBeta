from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Salesperson, AutomobileVO, Customer, Sale
import json
from .encoders import SalesEncoder, CustomerEncoder, SalespersonEncoder


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile"},
                status=400
            )
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson"},
                status=400
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer"},
                status=400
            )
        sales = Sale.objects.create(**content)
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
            safe=False
        )


@require_http_methods(["DELETE"])
def api_delete_sales(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Sale.objects.get(id=pk).delete()
            return JsonResponse(
                {"delete": count > 0}
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid ID"},
                status=404
            )


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customers": customer},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )


@require_http_methods(["DELETE", "GET"])
def api_delete_customer(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Customer.objects.get(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid ID"},
                status=404
            )
    else:
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder
        )



@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )


@require_http_methods(["DELETE"])
def api_delete_salespeople(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Salesperson.objects.get(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid ID"},
                status=404
            )
