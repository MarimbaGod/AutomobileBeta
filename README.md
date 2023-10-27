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
docker-volume create beta-data
docker-compose build
docker-compose up
```



## Design

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
    * automobile(foreign key)
    * salesperson(foreign key)
    * customer(foreign key)

The AutomobileVO is a value object which takes data from the Automobiles contained in the Inventory microservice by means of a poller. The poller will grab the data and update or create data every 60 seconds.

The Sale model gets data from all of the other models: AutomobileVO, Salesperson, and Customer.


## Sales Microservice API

Data can be created, viewed, and deleted on the front-end applications, but can also be done using Insomnia:

### Salespeople API

| Action | Method | URL |
| :---: | :---: | :---: |
| Salespeople List | GET | http://localhost:8090/api/salespeople/ |
| Create a salesperson | POST | http://localhost:8090/api/salespeople/ |
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/ |


Example POST input:

```
{
    "first_name": "Bill",
    "last_name":  "Nye",
    "employeeID" "Sales1"
}
```

Example POST output:

```
{
    "first_name": "Bill",
    "last_name":  "Nye",
    "employeeID" "Sales1",
    "id": 1
}
```
