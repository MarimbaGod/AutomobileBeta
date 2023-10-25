import { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';

function TechniciansList() {
    const [technicians, setTechnicians] = useState([]);
    //initializes the state, setting setTechnicians to update the state
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/technicians/');
            if (response.ok) {
                const data = await response.json();
                setTechnicians(data.technicians);
            }
        } catch (error) {
            console.error('Error getting Technicians:', error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteTechnician = async (id) => {
        const response = await fetch(`http://localhost:8080/api/technicians/${id}/`, {
            method: 'DELETE'
        })
        if (response.ok) {
            getData()
        }
    }

    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Employee Id</th>
                </tr>
            </thead>
        <tbody>
            {technicians.map(technician => {
                return(
                    <tr key={technician.id}>
                        <td>{technician.first_name}</td>
                        <td>{technician.last_name}</td>
                        <td>{technician.employee_id}</td>
                    <td>
                        <button className="btn btn-primary" onClick={() => deleteTechnician(technician.id)}>Remove Technician</button>
                    </td>
                    </tr>
                );
            })}
        </tbody>
        </table>
        </>
    )
}
export default TechniciansList
