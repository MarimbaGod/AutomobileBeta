import React, { useEffect, useState } from 'react';

function AppointmentForm() {
    const[vin, setVin] = useState('');
    const[customer, setCustomer] = useState('');
    const[date, setDate] = useState('');
    const[time, setTime] = useState('');
    const[technician, setTechnician] = useState('');
    const[reason, setReason] = useState('');
    const[technicians, setTechnicians] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date_time = new Date(`${date}T${time}`);
        data.technician = technician;
        data.reason = reason;


        // const appointmentUrl = "http://localhost/8080/api/appointments/";
        const appointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            }
        };

        const response = await fetch(appointmentUrl, fetchConfig)
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment)
            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setTechnician('');
            setReason('');

        }
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }
    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
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

    return(
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Schedule an Appointment</h1>
                    <form onSubmit={handleSubmit} id="create-service-appointment-form">
                        <div className="form-floating mb-3">
                            <input className="form-control" value={vin} onChange={handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin" />
                            <label htmlFor="vin">Automobile VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" value={customer} onChange={handleCustomerChange} placeholder="Customer" required type="text" name="customer" id="customer" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" value={date} onChange={handleDateChange} placeholder="Date" required type="date" name="date" id="date" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" value={time} onChange={handleTimeChange} placeholder="Time" required type="time" name="time" id="time" />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" value={reason} onChange={handleReasonChange} placeholder="Reason" required type="text" name="reason" id="reason" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" value={technician} onChange={handleTechnicianChange} required id="technician" name="technician">
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
                        <button className="btn btn-primary">Schedule</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

}

export default AppointmentForm;
