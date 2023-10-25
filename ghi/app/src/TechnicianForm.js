import React, { useEffect, useState } from 'react';

function TechnicianForm() {

    // const[firstName, setFirstName] = useState('');
    // const[lastName,setLastName] = useState('');
    // const[employeeId, setEmployeeId] = useState('');
    const[formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        employee_id:'',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const techniciansUrl = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type':'application/json',
            }
        };

        const response = await fetch(techniciansUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                first_name:'',
                last_name:'',
                employee_id:'',
            })
            // setFirstName('');
            // setLastName('');
            // setEmployeeId('');
        }
    }
    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange={handleFormChange} value={formData.employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

}

export default TechnicianForm
