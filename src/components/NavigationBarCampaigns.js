import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavigationBarCampaigns.scss";

function NavigationBarCampaigns(){
    return (
        <nav className="navbar-campaign">
            <NavLink to='/campaigns/upcoming-campaigns'  activeClassName="selectedLink">
                <span className='nav-link'>Upcoming Campaigns</span>
            </NavLink>
            <NavLink to='/campaigns/live-campaigns' activeClassName="selectedLink">
                <span className='nav-link'>Live Campaigns</span>
            </NavLink>
            <NavLink  to='/campaigns/past-campaigns' activeClassName="selectedLink">
                <span className='active nav-link'>Past Campaigns</span>
            </NavLink>
        </nav>
    );
}

export default NavigationBarCampaigns;
