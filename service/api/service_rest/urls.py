from django.urls import path
from .views import list_technicians, delete_technician, list_appointments, delete_appointment, appointment_cancel, appointment_finish

urlpatterns = [
    path("technicians/", list_technicians, name="list_technicians"),
    path("technicians/<int:pk>/", delete_technician, name="delete_technician"),
    path("appointments/", list_appointments, name="list_appointments"),
    path("appointments/<int:pk>/", delete_appointment, name="delete_appointment"),
    path("appointments/<int:pk>/cancel/", appointment_cancel, name="appointment_cancel"),
    path("appointments/<int:pk>/finish/", appointment_finish, name="appointment_finish")
]
