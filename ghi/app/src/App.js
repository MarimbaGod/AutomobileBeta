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


function App() {

  const [salespeople, setSalespeople] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [sales, setSales] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [models, setModels] = useState([]);

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
    getSalespeople();
    getCustomer();
    getSales();
    getAutomobiles();
    getModels();
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
          <Route path="models" element={<AutoModelForm getModels={getModels} />} />
          <Route path="technicians">
            <Route index element={<TechniciansList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            <Route index element={<AppointmentList />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter >
  );
}

export default App;
