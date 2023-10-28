import React, { useState } from 'react';


function NewSalespeople() {

    const [firstName, setFirstName] = useState('');
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }


    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }


    const [employeeId, setEmployeeId] = useState('');
    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salespeopleUrl, fetchConfig);
        if (response.ok) {

            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    };


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" name="First Name" id="First Name" className="form-control" />
                            <label htmlFor="First Name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" name="last name" id="last name" className="form-control" />
                            <label htmlFor="last name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeIdChange} value={employeeId} placeholder="Employee id" required type="text" name="employee id" id="employee id" className="form-control" />
                            <label htmlFor="employee id">Employee Id</label>
                        </div>
                        <button className="btn btn-primary">Create Salesperson</button>
                    </form>
                </div>
            </div>
        </div>

    );


}


export default NewSalespeople;
