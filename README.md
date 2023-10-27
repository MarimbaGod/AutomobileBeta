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



## Service microservice

Explain your models and integration with the inventory
microservice, here.

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

Data can be created, viewed, and deleted on the front-end applications, but can also be done using Insomnia. Microservice is located on port 8090.

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
