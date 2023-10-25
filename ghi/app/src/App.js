import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechniciansList';
import AppointmentForm from './AppointmentForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<TechniciansList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
