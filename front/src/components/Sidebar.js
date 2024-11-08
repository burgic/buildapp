import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><NavLink to="/personal-details" activeClassName="active">Personal Details</NavLink></li>
        <li><NavLink to="/employment-details" activeClassName="active">Employment</NavLink></li>
        <li><NavLink to="/incomes" activeClassName="active">Incomes</NavLink></li>
        <li><NavLink to="/expenses" activeClassName="active">Expenses</NavLink></li>
        <li><NavLink to="/pensions" activeClassName="active">Pensions</NavLink></li>
        <li><NavLink to="/savings-investments" activeClassName="active">Savings & Investments</NavLink></li>
        <li><NavLink to="/other-assets" activeClassName="active">Other Assets</NavLink></li>
        <li><NavLink to="/loans-mortgages" activeClassName="active">Loans & Mortgages</NavLink></li>
        <li><NavLink to="/health-protection" activeClassName="active">Health & Protection</NavLink></li>
        <li><NavLink to="/insights-objectives" activeClassName="active">Insights & Objectives</NavLink></li>
      </ul>
      <button className="save-review-button">Save & Review</button>
    </div>
  );
};

export default Sidebar;
