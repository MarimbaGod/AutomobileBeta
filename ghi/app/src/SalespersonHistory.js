import { useEffect, useState } from 'react';

function SalespersonHistory() {

    const [salespeople, setSalespeople] = useState([]);
    const fetchSalespeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const salespeopleData = await response.json();
            setSalespeople(salespeopleData.salespeople);
        }
    };

    const [sales, setSales] = useState([]);
    const fetchSalesData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const salesData = await response.json();
            setSales(salesData.sales);
        }
    };

    useEffect(() => {
        fetchSalespeople();
        fetchSalesData();
    }, []);

    const [selectedSalesperson, setSelectedSalesperson] = useState('');
    const handleSalespersonChange = (o) => {
        setSelectedSalesperson(o.target.value);
    };
    const filteredSales = sales.filter((sale) => sale.salesperson.employee_id === selectedSalesperson);

    return (
        <>
            <h1>Salesperson History</h1>
            <select onChange={handleSalespersonChange} id="salespersonSelect">
                <option value=""> Select Salesperson </option>
                {salespeople.map((salesperson) => (
                    <option key={salesperson.employee_id} value={salesperson.employee_id}>
                        {`${salesperson.first_name} ${salesperson.last_name}`}
                    </option>
                ))}
            </select>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredSales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                            <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    );
}

export default SalespersonHistory;
