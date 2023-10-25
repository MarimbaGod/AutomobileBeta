import React, { useState, useEffect } from "react";

function CustomerList() {
    const [customers, setCustomers] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    const deleteCustomer = async (id) => {
        const customersUrl = `http://localhost:8090/api/customers/${id}/`
        const fetchConfig = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(customersUrl, fetchConfig)
        if (response.ok) {
            window.location.reload()
        }
    }


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {customers && customers.map(customer => {
                    return (
                        <tr key={customer.id}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.address}</td>
                            <td>
                                <button onClick={(e) => deleteCustomer(customer.id)} >Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CustomerList
