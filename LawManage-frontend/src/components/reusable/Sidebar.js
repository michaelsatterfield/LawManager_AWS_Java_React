import React from "react";
import { Link } from "react-router-dom";
import "./css/sidebar.css"; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/clients">Calenadar</Link>
        </li>
        <li>
          <Link to="/settings">Tasks</Link>
        </li>
        <li>
          <Link to="/dashboard">Cases</Link>
        </li>
        <li>
          <Link to="/clients">Communications</Link>
        </li>
        <li>
          <Link to="/settings">Billing</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
