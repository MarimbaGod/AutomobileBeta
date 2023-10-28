import React, { useState, useEffect } from "react";

function ServiceHistory() {
    const [vin, setVin] = useState('');
    const [automobiles, setAutomobiles] = useState('');
    const [appointments, setAppointments] = useState([]);


    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const fetchAutos = async () => {
        const response = await fetch("http://localhost:8100/api/automobiles/")
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    async function getAppointments() {
        const url = "http://localhost:8080/api/appointments/";
        const url_check = `http://localhost:8080/api/appointments/?vin=${vin}`;

        const search_url = vin ? url_check : url;

        const response = await fetch(search_url);
        if (response.ok) {
          const {appointments} = await response.json()
          setAppointments(appointments)
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        getAppointments();
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

    useEffect(() => {
        getAppointments();
        fetchAutos();
    }, []);


    return (
        <div className="row">
            <div className="mt-4 col-10">
                <h1>Service History</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="vin_search" onChange={handleVinChange} />
                        <label htmlFor="vin_search"> Search by VIN: </label>
                        <button type="submit">Search</button>
                    </form>
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
                                        <td>
                                            {automobiles.map(automobile => {
                                                if (appointment.vin === automobile.vin) {
                                                    return "Yes"
                                                } else {
                                                    return null
                                                }
                                            })}
                                        </td>
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
