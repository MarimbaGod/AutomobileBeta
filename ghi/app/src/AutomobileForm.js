import React, { useState, useEffect } from 'react';

function AutomobileForm() {

    const [model_id, setModel] = useState('')

    const [color, setColor] = useState('')
    const handleColorChange = (event) => {
        const value = event.target.value
        setColor(value)
    }

    const [year, setYear] = useState('')
    const handleYearChange = (event) => {
        const value = event.target.value
        setYear(value)
    }

    const [vin, setVin] = useState('')
    const handleVinChange = (event) => {
        const value = event.target.value
        setVin(value)
    }

    const [models, setModelsInfo] = useState([])
    const handleModelChange = (event) => {
        const value = event.target.value
        setModel(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}

        data.color = color
        data.year = year
        data.vin = vin
        data.model_id = model_id

        const autosUrl = 'http://localhost:8100/api/automobiles/'

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applications/json'
            },
        }

        const response = await fetch(autosUrl, fetchConfig)
        if (response.ok) {

            setColor('')
            setYear('')
            setVin('')
            setModel('')
        }
    }


    const fetchModelsInfo = async () => {
        const autosUrl = 'http://localhost:8100/api/models';
        const response = await fetch(autosUrl)

        if (response.ok) {
            const data = await response.json();
            setModelsInfo(data.models)
        }
    }

    useEffect(() => {
        fetchModelsInfo();
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Add Automobile to Inventory</h2>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColorChange} placeholder="color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={year} onChange={handleYearChange} placeholder="year" required type="text" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVinChange} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" value={model_id} onChange={handleModelChange} >
                                <option>Choose a Model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AutomobileForm
