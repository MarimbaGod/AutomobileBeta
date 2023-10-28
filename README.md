# CarCar

Team:

* Kyle Bossert - Service
* Matthew Lee - Sales

## Getting Started

You will need Docker, Git, and Node.js 18.2 or above

1. Fork this repository

2. Run terminal and clone repository to folder of your choice

3. Navigate to that folder in the terminal and run:

```
docker volume create beta-data
docker-compose build
docker-compose up
```

4. Confirm your container is running and all services are up.

5. CarCar can be viewed in your browser at: http://localhost:3000/


## Design

![Img](/img/CarCar_design.png)

## Inventory microservice

The inventory microservice creates and stores data relating to the Cars in the inventory. This includes, Manufacturer (ex. Toyota, Ford), Model (ex. Camry, Silverado), and the Automobile itself.

This microservice contains 3 models:

1. Manufacturer
    * name

1. VehicleModel
    * name
    * picture_url
    * manufacturer (foreign key)

1. Automobile
    * color
    * year
    * vin
    * sold
    * model (foreign key)

The Vehicle Model retrieves information from the manufacturer model to create the car "make and model" (ex. Jeep Wrangler). That info is then used in the Automobile model to create the entry for the car.


## Inventory Microservice API

Data can be created, viewed, and deleted on the front-end applications, but can also be done using Insomnia. Microservice API is located on port 8100.

### Manufacturer API

| Action | Method | URL |
| :---: | :---: | :---: |
| Manufacturer List | GET | http://localhost:8100/api/manufacturers/ |
| Get Specific Manufacturer | GET | http://localhost:8100/api/manufacturers/id/ |
| Create a Manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Update a Manufacturer | PUT | 	http://localhost:8100/api/manufacturers/id/ |
| Delete a Manufacturer | DELETE | 	http://localhost:8100/api/manufacturers/id/ |

Example GET output:
```
Manufacturer List
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Toyota"
		}
	]
}

Specific Manufacturer
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Toyota"
}
```

Example POST input and output:
```
input
{
	"name": "Toyota"
}

output
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Toyota"
}
```

Example PUT input and output:
```
input
{
	"name": "Lexus"
}

output
{
	"href": "/api/manufacturers/4/",
	"id": 4,
	"name": "Lexus"
}
```

Example Delete output:
```
if id exists
{
	"id": null,
	"name": "Lexus"
}

if id does not exist
{
	"message": "Does not exist"
}
```

### Vehicle Models API

| Action | Method | URL |
| :---: | :---: | :---: |
| Model List | GET | http://localhost:8100/api/models/ |
| Get Specific Model | GET | http://localhost:8100/api/models/id/ |
| Create a Model | POST | http://localhost:8100/api/models/ |
| Update a Model | PUT | 	http://localhost:8100/api/models/id/ |
| Delete a Model | DELETE | 	http://localhost:8100/api/models/id/ |

Example GET output:
```
Model List
{
	"models":

			"href": "/api/models/1/",
			"id": 1,
			"name": "Camry",
			"picture_url": "example url",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Toyota"
			}
}

Specific Model
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Camry",
	"picture_url": "example url",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Toyota"
	}
}
```

Example POST input and output:
```
input
{
	"name": "Camry",
	"picture_url": "example url",
	"manufacturer_id": 1
}

output
{
	"href": "/api/models/8/",
	"id": 8,
	"name": "Camry",
	"picture_url": "example url",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Toyota"
	}
}
```

Fields able to be updated:
```
"name"
"picture_url"
```
You cannot update a vehicle model's manufacturer.


Example PUT input and output:
```
input
{
	"name": "RAV4",
	"picture_url": "new example url"
}

output
{
	"href": "/api/models/8/",
	"id": 8,
	"name": "RAV4",
	"picture_url": "new example url",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Toyota"
	}
}
```

Example DELETE output:
```
id exists
{
	"id": null,
	"name": "RAV4",
	"picture_url": "example url",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Toyota"
	}
}

id does not exist
{
	"message": "Does not exist"
}
```

### Automobile API

URLs for automobiles are not called by their "id", but rather their "VIN". Please use their "VIN" when referencing them in URLs.

**VIN has a max of 17 characters**

| Action | Method | URL |
| :---: | :---: | :---: |
| Automobile List | GET | http://localhost:8100/api/automobiles/ |
| Get Specific Automobile | GET | http://localhost:8100/api/automobiles/vin/ |
| Create a Automobile | POST | http://localhost:8100/api/automobiles/ |
| Update a Automobile | PUT | 	http://localhost:8100/api/automobiles/vin/ |
| Delete a Automobile | DELETE | 	http://localhost:8100/api/automobiles/vin/ |


Example GET output:
```
Automobile list
{
	"autos": [
		{
			"href": "/api/automobiles/TEST2/",
			"id": 3,
			"color": "Silver",
			"year": 2021,
			"vin": "TEST2",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "Camry",
				"picture_url": "example url",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Toyota"
				}
			},

Specific Automobile
{
	"href": "/api/automobiles/TEST2/",
	"id": 3,
	"color": "Silver",
	"year": 2021,
	"vin": "TEST2",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Camry",
		"picture_url": "example url",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Toyota"
		}
	},
	"sold": false
}
```

Example POST input and output:
```
input
{
	"color": "Silver",
	"year": 2021,
	"vin": "12345678901234567",
	"model_id": 1
}

output
{
	"href": "/api/automobiles/12345678901234567/",
	"id": 9,
	"color": "Silver",
	"year": 2021,
	"vin": "12345678901234567",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Camry",
		"picture_url": "example url",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Toyota"
		}
	},
	"sold": false
}
```

Fields able to be updated:
```
"color"
"year"
"sold"
```

Example PUT input and output
```
input
{
	"color": "Black",
	"year": "2023",
	"sold": true
}

output
{
	"href": "/api/automobiles/12345678901234567/",
	"id": 9,
	"color": "Black",
	"year": "2023",
	"vin": "12345678901234567",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Camry",
		"picture_url": "example url",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Toyota"
		}
	},
	"sold": true
}
```

Example DELETE output:
```
VIN exists
{
	"href": "/api/automobiles/12345678901234567/",
	"id": null,
	"color": "Black",
	"year": 2023,
	"vin": "12345678901234567",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Camry",
		"picture_url": "https://images.unsplash.com/photo-1624578571415-09e9b1991929?auto=format&fit=crop&q=80&w=1290&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Toyota"
		}
	},
	"sold": true
}

VIN does not exist
{
	"message": "Does not exist"
}
```


## Service microservice
The Service microservice handles the scheduling of service appointments for customers' cars. It manages the VIP status marked with "Yes", as well as the status of the appointment, and the reason for the service.

This microservice stores the Technicians who will work the appointments, and can be accessed through the url:
Technician List: http://localhost:3000/technicians/list/

To add a new technician to your roster:
Create Technician: http://localhost:3000/technicians/create/

To view all active appointments:
Appointment List: http://localhost:3000/appointments/list/

To schedule a new Appointment:
Create Appointment: http://localhost:3000/appointments/create/

To view all past appointments:
Service History List: http://localhost:3000/appointments/history/
This page contains a VIN Search function to find specific Service History

The Service Microservice has three models:

AutomobileVO: A Value object of Automobile that has the fields:
vin: Primarily used to determine VIP Status of Customers.
sold: tracks whether the AutomobileVO was sold by us.

Technician:
first_name: Simple Character field to store the technician's first name.
last_name: Another Character field storing the technician's last name.
employee_id: A character field storing the employee's id number

Appointment:
date_time: This is a DateTimeField() to store the date and time of the appointment
reason: This is a text field to store the reason for the appointment
status: This is to track ACTIVE, FINISHED, or CANCELLED appointments
vin: A character field with a maximum length of 17, like all VIN numbers.
customer: A character field for the name of the customer
technician: A character field with the name of the Technician assigned to the service appointment



## Sales microservice

The Sales microservice manages the sales of the cars from inventory. It also manages the potential customers as well as the salespeople.

This microservice contains 4 models:

1.  AutomobileVO
    * vin
    * sold

1. Salesperson
    * first_name
    * last_name
    * employee_id

1. Customer
    * first_name
    * last_name
    * address
    * phone_number

1. Sale
    * price
    * automobile (foreign key)
    * salesperson (foreign key)
    * customer (foreign key)

The AutomobileVO is a value object which takes data from the Automobiles contained in the Inventory microservice by means of a poller. The poller will grab the data and update or create data every 60 seconds. This will be used as a foreign key for the Sale model so we can associate a vehical from the inventory to a sale.

The Sale model gets data from all of the other models: AutomobileVO, Salesperson, and Customer.


## Sales Microservice API

Data can be created, viewed, and deleted on the front-end applications, but can also be done using Insomnia. Microservice API is located on port 8090.

### Salespeople API
**The "id" in the url is the "id" value of the salesperson, NOT the "employee_id".**

| Action | Method | URL |
| :---: | :---: | :---: |
| Salespeople List | GET | http://localhost:8090/api/salespeople/ |
| Create a salesperson | POST | http://localhost:8090/api/salespeople/ |
| Delete a salesperson | DELETE | http://localhost:8090/api/salespeople/id/ |

Example GET output:

```
{
    "salespeople": {
        "first_name": "Tom",
        "last_name": "Hanks",
        "employee_id": "Sales5"
        "id": 4
    }
}
```

Example POST input and output:

```
input:
{
    "first_name": "Bill",
    "last_name":  "Nye",
    "employee_id" "Sales1"
}

output:
{
    "first_name": "Bill",
    "last_name":  "Nye",
    "employee_id" "Sales1",
    "id": 1
}
```

Example DELETE output:
```
If a salesperson with the referenced id exists:
{
    "deleted": true
}

If id does not exist:
{
    "message": "Invalid ID"
}
```


### Customer API

| Action | Method | URL |
| :---: | :---: | :---: |
| Customer List | GET | http://localhost:8090/api/customers/ |
| Create a Customer | POST | http://localhost:8090/api/customers/ |
| Delete a Customer | DELETE | http://localhost:8090/api/customers/id/ |

Example GET output:

```
{
    "first_name": "Austin",
    "last_name": "Powers",
    "address": "100 Groovy Street",
    "phone_number: "230-120-4305"
    "id": 1
}
```

Example POST input and output:

```
input:
{
		"first_name": "Spongebob",
		"last_name": "Squarepants",
		"address": "124 Conch Street",
		"phone_number": "123-456-7890"
}

output:
{
	"first_name": "Spongebob",
	"last_name": "Squarepants",
	"address": "124 Conch Street",
	"phone_number": "123-456-7890",
	"id": 10
}
```

Example DELETE output:

```
If a customer with the referenced id exists:
{
    "deleted": true
}

If id does not exist:
{
    "message": "Invalid ID"
}
```

### Sales
**The "id" in the url is the "id" value of the salesperson, NOT the "employee_id".**

| Action | Method | URL |
| :---: | :---: | :---: |
| Sales List | GET | http://localhost:8090/api/sales/ |
| Create a Sale | POST | http://localhost:8090/api/sales/ |
| Delete a Sale | DELETE | http://localhost:8090/api/sales/id/ |

Example GET output:

```
{
	"sales": {
			"price": 15000,
			"automobile": {
				"vin": "12TRE67R90G23E567",
				"sold": true
			},
			"salesperson": {
				"first_name": "Bill",
				"last_name": "Nye",
				"employee_id": "Sales1",
				"id": 4
			},
			"customer": {
				"first_name": "Spongebob",
				"last_name": "Squarepants",
				"address": "124 Conch Street",
				"phone_number": "123-456-7890",
				"id": 10
			},
			"id": 8
        }
}
```

Example POST input and output:


```
input:
{
	"price": 15000,
	"automobile": "12TRE67R90G23E567",
	"salesperson": 4,
	"customer": 10
}
NOTE: "salesperson" value should be the "salesperson" "id", NOT "employee_id"
      "customer" value should be the "customer" "id"

output:
{
	"sales": {
			"price": 15000,
			"automobile": {
				"vin": "12TRE67R90G23E567",
				"sold": true
			},
			"salesperson": {
				"first_name": "Bill",
				"last_name": "Nye",
				"employee_id": "Sales1",
				"id": 4
			},
			"customer": {
				"first_name": "Spongebob",
				"last_name": "Squarepants",
				"address": "124 Conch Street",
				"phone_number": "123-456-7890",
				"id": 10
			},
			"id": 8
        }
}
```

Example DELETE output:

```
If a sale with the referenced id exists:
{
    "deleted": true
}

If id does not exist:
{
    "message": "Invalid ID"
}
```
