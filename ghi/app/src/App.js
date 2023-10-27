import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Salespeople from './Salespeople';
import React, { useState, useEffect } from 'react';
import SalespeopleForm from './SalespersonForm';
import CustomerList from './Customers';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';

import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechniciansList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';

function App() {

  const [salespeople, setSalespeople] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [sales, setSales] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [technicians, setTechnicians] = useState([])

  async function getAppointments() {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const {appointments} = await response.json()
      setAppointments(appointments)
    }
  }

  async function getAutomobiles() {
    const url= "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const {automobiles} = await response.json()
      setAutomobiles(automobiles)
    }
  }

  async function getTechnicians() {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const {technicians} = await response.json();
      setTechnicians(technicians);
    }
  }

  async function getSalespeople() {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json()
      setSalespeople(data.salesperson)
    }
  }


  async function getCustomer() {
    const url = "http://localhost:8090/api/customers/"
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setCustomer(data.customer)
    }
  }


  async function getSales() {
    const url = "http://localhost:8090/api/sales/"
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setCustomer(data.sales)
    }
  }



  useEffect(() => {
    getAutomobiles();
    getSalespeople();
    getTechnicians();
    getCustomer();
    getSales();
    getAppointments();
  }, []);



  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople" element={<Salespeople salespeople={salespeople} />} />
          <Route path="salespeople/new" element={<SalespeopleForm getSalespeople={getSalespeople} />} />
          <Route path="customers" element={<CustomerList customer={customer} />} />
          <Route path="customers/new" element={<CustomerForm getCustomer={getCustomer} />} />
          <Route path="sales" element={<SalesList sales={sales} />} />
          <Route path="technicians">
            <Route index element={<TechniciansList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            <Route index element={<AppointmentList />} />
          </Route>
          <Route path="servicehistory" element={<ServiceHistory appointments={appointments} technicians={technicians} automobiles={automobiles}/>} />
        </Routes>

      </div>
    </BrowserRouter >
  );
}

export default App;
