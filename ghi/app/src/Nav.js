import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Inventory</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/automobiles">Automobiles</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles/new">Add Automobile</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models">Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models/new">Add a Model</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers/new">Add a Manufacturer</NavLink></li>

              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Salespeople</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/salespeople">Salespeople</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespeople/new">Add New Salesperson</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespeople/history">Salesperson History</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Customers</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/customers">Customers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers/new">Add New Customer</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/sales">Sales</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/new">Create a Sale</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Technicians</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/technicians">Technician</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians/new">Add New Technician</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Service Appointments</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/appointments">Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/new">Schedule a New Appointment</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Service History</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/servicehistory">Service History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Nav;
