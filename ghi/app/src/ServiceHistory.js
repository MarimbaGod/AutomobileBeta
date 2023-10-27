import React, { useState, useEffect } from "react";

function ServiceHistory() {
    const [vin, setVin] = useState('');
    const [appointments, setAppointments] = useState([]);


    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }



    async function getAppointments() {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
          const {appointments} = await response.json()
          setAppointments(appointments)
        }
    }

    useEffect(() => {
        getAppointments();
    }, []);


    return (
        <div className="row">
            <div className="mt-4 col-10">
                <h1>Service History</h1>
                <div>
                    <input type="text" id="vin_search" onChange={handleVinChange} />
                    <label htmlFor="vin_search">Search by VIN:</label>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>VIP Status:</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => {
                            const dateTime = new Date(appointment.date_time)
                                return(
                                    <tr key={appointment.id} value={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>{appointment.sold ? "Yes": "No" }</td>
                                        <td>{appointment.customer}</td>
                                        <td>{dateTime.toLocaleDateString()}</td>
                                        <td>{dateTime.toLocaleTimeString()}</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                        <td>{appointment.reason}</td>
                                        <td>{appointment.status}</td>
                                    </tr>
                                )

                            })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ServiceHistory
