import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function AutoModelsList() {
    const [models, setModels] = useState([]);


    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8100/api/models/');
            if (response.ok) {
                const data = await response.json();
                setModels(data.models)
            }
        } catch (error) {
            console.error('Failed to get models:', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map((model) => {
                    return(
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td><img style={{width:350, height: 250 }} src={model.picture_url}/></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    )
}
export default AutoModelsList;
