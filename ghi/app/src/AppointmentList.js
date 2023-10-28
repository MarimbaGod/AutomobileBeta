import React, { useEffect, useState } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState('');

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments.filter(appointment => appointment.status==="ACTIVE"));

        }
    }

    const fetchAutos = async () => {
        const response = await fetch("http://localhost:8100/api/automobiles/")
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }


    // async function isVip() {
    //     const autoUrl = "http://localhost:8100/api/automobiles/";
    //     const apptUrl = "http://localhost:8080/api/appointments/";
    //     const autoResponse = await fetch(autoUrl);
    //     const apptResponse = await fetch(apptUrl);

    //     const {autos} = await autoResponse.json();
    //     const {appointments} = await apptResponse.json();

    //     const apptVins = appointments.map(appt => appt.vin);
    //     for (let auto of autos) {
    //         if (apptVins.includes(auto.vin)) {
    //             return true;
    //         }
    //         return false;

    //     }
    // }

    const handleCancel = async (id) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
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
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
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
        fetchAutos();
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
                        <th>VIP Status</th>
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
                                <td>
                                            {automobiles.map(automobile => {
                                                if (appointment.vin === automobile.vin) {
                                                    return "Yes"
                                                } else {
                                                    return null
                                                }
                                            })}
                                        </td>
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
