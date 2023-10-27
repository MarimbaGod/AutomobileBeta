from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}"

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=200, default="ACTIVE")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE,
        related_name="appointments"
    )


    def cancel(self):
        status = "CANCELLED"
        self.status = status
        self.save()

    def finish(self):
        status = "FINISHED"
        self.status = status
        self.save()

    def __str__(self):
        return f"{self.customer}"
