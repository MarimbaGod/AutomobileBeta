import React, { useEffect, useState } from 'react';

function AppointmentList(props) {
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments.filter(appointment => appointment.status==="ACTIVE"));

        }
    }

    const handleCancel = async (id) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/cancel`;
        const fetchConfig = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            fetchData();
        }
    }
    const handleFinish = async (id) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/finish`;
        const fetchConfig = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);

        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString ();
        return {date, time}
    };

    return(
        <>
        <div className = "p-4 mt-4">
            <h1>Service Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Automobile VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => {
                        const {date, time} = formatDateTime(appointment.date_time);
                        return(
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.customer}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleCancel(appointment.id)}>Cancel</button>
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleFinish(appointment.id)}>Finish</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );

}
export default AppointmentList;
