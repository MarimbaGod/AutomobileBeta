import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Salespeople from './Salespeople';
import React, { useState, useEffect } from 'react';
import SalespeopleForm from './SalespersonForm';
import CustomerList from './Customers';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
import SaleForm from './SaleForm';

import AutomobileList from './AutomobileList';

import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechniciansList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import SalespersonHistory from './SalespersonHistory';
import AutoModelForm from './AutoModelForm';
import AutomobileForm from './AutomobileForm';
import ServiceHistory from './ServiceHistory';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import AutoModelsList from './AutoModelsList';

function App() {

  const [salespeople, setSalespeople] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [sales, setSales] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);


  async function getManufacturers() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const { manufacturers } = await response.json()
      setManufacturers(manufacturers)
    }
  }


  async function getAppointments() {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const { appointments } = await response.json()
      setAppointments(appointments)
    }
  }

  async function getAutomobiles() {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const { automobiles } = await response.json()
      setAutomobiles(automobiles)
    }
  }

  async function getTechnicians() {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const { technicians } = await response.json();
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
      setSales(data.sales)
    }
  }


  async function getAutomobiles() {
    const url = "http://localhost:8100/api/automobiles/"
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setAutomobiles(data.autos)
    }
  }


  async function getModels() {
    const response = await fetch("http://localhost:8100/api/models/");
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  }

  useEffect(() => {
    getAutomobiles();
    getSalespeople();
    getTechnicians();
    getCustomer();
    getSales();
    getAppointments();
    getAutomobiles();
    getModels();
    getManufacturers();
  }, []);



  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople" element={<Salespeople salespeople={salespeople} />} />
          <Route path="salespeople/new" element={<SalespeopleForm getSalespeople={getSalespeople} />} />
          <Route path="salespeople/history" element={<SalespersonHistory salespeople={salespeople} sales={sales} getSales={getSales} />} />
          <Route path="customers" element={<CustomerList customer={customer} />} />
          <Route path="customers/new" element={<CustomerForm getCustomer={getCustomer} />} />
          <Route path="sales" element={<SalesList sales={sales} />} />
          <Route path="sales/new" element={<SaleForm getSales={getSales} />} />
          <Route path="automobiles" element={<AutomobileList automobiles={automobiles} />} />
          <Route path="automobiles/new" element={<AutomobileForm getAutomobiles={getAutomobiles} />} />
          <Route path="models" element={<AutoModelsList models={models} />} />
          <Route path="models/new" element={<AutoModelForm getModels={getModels} />} />
          <Route path="technicians">
            <Route index element={<TechniciansList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            <Route index element={<AppointmentList />} />
          </Route>
          <Route path="manufacturers">
            <Route path="new" element={<ManufacturerForm />} />
            <Route index element={<ManufacturerList />} />
          </Route>
          <Route path="servicehistory" element={<ServiceHistory appointments={appointments} technicians={technicians} automobiles={automobiles} />} />
        </Routes>

      </div>
    </BrowserRouter >
  );
}

export default App;
