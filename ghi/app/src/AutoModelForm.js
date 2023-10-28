import React, { useState, useEffect } from 'react';


function AutoModelForm() {

    const [modelName, setVehicle] = useState('');
    const modelChange = (event) => {
        const value = event.target.value;
        setVehicle(value);
    }

    const [picture, setPicture] = useState('');
    const pictureChange = (event) => {
        const value = event.target.value;
        setPicture(value);
    }

    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const manufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value)
    }

    const handleVehicleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = modelName;
        data.picture_url = picture;
        data.manufacturer_id = manufacturer;

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {

            setVehicle('');
            setPicture('');
            setManufacturer('');
        }
    }

    const fetchManufactures = async () => {
        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(manufacturersUrl);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufactures()
    }, []);

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add Vehicle Model</h1>
                        <form onSubmit={handleVehicleSubmit} id="create-vehicle-model-form">
                            <div className="form-floating mb-3">
                                <input value={modelName} onChange={modelChange} placeholder="Model name" required type="text" name="model" id="model" className="form-control" />
                                <label htmlFor="model">Model Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={picture} onChange={pictureChange} placeholder="Picture URL" required type="text" name="picture" id="picture" className="form-control" />
                                <label htmlFor="picture">Picture URL</label>
                            </div>
                            <div className="mb-3">
                                <select value={manufacturer} onChange={manufacturerChange} placeholder="" name="manufacturer" id="manufacturer" className="form-select" >
                                    <option value="">Choose a Manufacturer</option>
                                    {manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create Model</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AutoModelForm;
