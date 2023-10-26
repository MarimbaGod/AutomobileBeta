from django.shortcuts import render
from .models import Technician, AutomobileVO, Appointment
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
# Create your views here.

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]
    def get_extra_data(self, o):
        appointments = o.appointments.all()
        statuses = [appointment.status for appointment in appointments]
        return {"statuses": statuses}

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]
    def get_extra_data(self, o):
        appointments = o.appointments.all()
        statuses = [appointment.status for appointment in appointments]
        return {"statuses": statuses}

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "status",
        "reason",
        "customer",
        "vin",
        "technician",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder()
    }

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {
        "technician":TechnicianDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def list_technicians(request): #Could add a Try/Except for this view
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder= TechnicianListEncoder,
                safe=False,
            )
        except (KeyError, ValueError) as error:
            return JsonResponse(
                {"message": str(error)},
                status=400,
            )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except (KeyError, ValueError) as error:
            return JsonResponse(
                {"message": str(error)},
                status=400,
            )


@require_http_methods(["DELETE"])
def delete_technician(request, pk):
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        # if id is not None:
        # appointments = Appointment.objects.filter(technician=id)
        # else:
        appointments = Appointment.objects.all()

        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:


            technician = Technician.objects.get(id=content['technician'])
            content['technician'] = technician
            appointment = Appointment.objects.create(**content)

            return JsonResponse(
                {"appointment": appointment},
                encoder=AppointmentDetailEncoder,
                safe=False,
            )

        except (KeyError, ValueError) as error:
            return JsonResponse({"message": str(error)}, status=400)


@require_http_methods(["DELETE"])
def delete_appointment(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def appointment_cancel(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(
        appointment,
        encoder=AppointmentDetailEncoder,
        safe=False
    )

@require_http_methods(["PUT"])
def appointment_finish(reqpest, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentDetailEncoder,
        safe=False,
    )
