import React, { useState, useEffect } from "react";


function Salespeople() {
    const [salespeople, setSalespeople] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    const deleteSalesperson = async (id) => {
        const salespeopleUrl = `http://localhost:8090/api/salespeople/${id}/`
        const fetchConfig = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(salespeopleUrl, fetchConfig)
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
                    <th>Employee ID</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map((salesperson) => {
                    return (
                        <tr key={salesperson.id}>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                            <td>{salesperson.employee_id}</td>
                            <td>
                                <button onClick={(e) => deleteSalesperson(salesperson.id)} >Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

export default Salespeople;
