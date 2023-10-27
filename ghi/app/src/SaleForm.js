import React, { useEffect, useState } from 'react';

function SaleForm() {

    const [automobile, setAutomobile] = useState('');
    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const [salesperson, setSalesperson] = useState('');
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const [customer, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const [automobiles, setAutomobiles] = useState([]);
    const getAutomobiles = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/')
        if (response.ok) {
            const data = await response.json();
            const availableAutos = data.autos.filter(auto => !auto.sold);
            setAutomobiles(availableAutos);
        }
    }

    const [customers, setCustomers] = useState([]);
    const getCustomers = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    const [salespeople, setSalespeople] = useState([]);
    const getSalespeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}

        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;

        const salesUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newSales = await response.json();

            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
        }

    }
    useEffect(() => {
        getAutomobiles();
        getCustomers();
        getSalespeople();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create Sale</h1>
                    <form onSubmit={handleSubmit} id="create-sales-form">
                        <div className="form-floating mb-3">
                            <select onChange={handleAutomobileChange} value={automobile} placeholder="Automobile" required type="text" name="automobile" id="automobile" className="form-select">
                                <option value="">Select an Automobile</option>
                                {automobiles.map(autos => {
                                    return (
                                        <option value={autos.vin} key={autos.vin}>
                                            {autos.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleSalespersonChange} value={salesperson} required name="Salesperson" className="form-select">
                                <option value="">Select a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.employee_id}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleCustomerChange} value={customer} required name="customer" className="form-select">
                                <option value="">Select a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePriceChange} value={price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                            <label htmlFor="Phone Number">Price</label>
                        </div>
                        <button className="btn btn-primary">Create Sale</button>
                    </form>
                </div>
            </div>
        </div>

    );


}


export default SaleForm;
