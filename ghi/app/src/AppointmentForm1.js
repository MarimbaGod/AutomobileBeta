import React, {useEffect, useState} from 'react';

function AppointmentForm() {
    const [formData, setFormData] = useState({
        vin:'',
        customer:'',
        date: '',
        time:'',
        reason:'',
        technician:'',
    });
    const [technicians, setTechnicians] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        //combining back into a date_time object
        const datetime = `${formData.date}T${formData.time}`;

        const combinedData = {
            ...formData,
            date_time: datetime,
        };
        console.log(combinedData)
        delete combinedData.date;
        delete combinedData.time;
        console.log(combinedData)

        const appointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(combinedData),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(appointmentUrl, fetchConfig)
        if (response.ok) {
            const newAppointment = await response.json();
            setFormData({
                vin:'',
                customer:'',
                date:'',
                time:'',
                technician:'',
                reason:'',
            })
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

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Schedule an Appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange={handleFormChange} value={formData.customer} placeholder="Customer" required type="text" name="customer" id="customer" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange={handleFormChange} value={formData.date} placeholder="Date" required type="date" name="date" id="date" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange={handleFormChange} value={formData.time} placeholder="Time" required type="time" name="time" id="time" />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" onChange={handleFormChange} value={formData.reason} placeholder="Reason" required type="text" name="reason" id="reason" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" value={formData.technician} onChange={handleFormChange} required id="technician" name="technician">
                                <option value="">Choose a Technician</option>
                                {technicians.map(tech => {
                                    return(
                                        <option key={tech.id} value={tech.id}>
                                            {tech.first_name} {tech.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

}

export default AppointmentForm
