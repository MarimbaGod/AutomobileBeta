import React, { useState } from 'react';

function ManufacturerForm() {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;

        const manufacturersUrl = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json',

            }
        };

        const response = await fetch(manufacturersUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            setName('');
        }
    }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value)
    }

    return (
        <div className = "row">
            <div className = "offset-3 col-6">
                <div className = "shadow p-4 mt-4">
                    <h1>Add a new Manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange = {handleNameChange} value ={name} placeholder="Manufacturer Name" requried type="text" name="name" id="name" />
                            <label htmlFor="name">Manufacturer Name</label>
                        </div>

                        <button className="btn btn-primary">Add Manufacturer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerForm;
