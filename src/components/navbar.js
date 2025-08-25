import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';


function MyNavbar( { user, setUser } ) {

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav>
      <div className="MyNavbar">

        <NavLink to="/" end>
          <img id="navLogo" src="/Logo.png" alt="InvestiSmart Logo" />
        </NavLink>

        <div className="MyNavbarLinks">

          {user && (
            <>
              <NavLink to="/dashboard" className="dashboardText">Your Dashboard</NavLink>
              <NavLink to="/portfolio" className="portfolioText">Your Portfolio</NavLink>
            </>
          )}
        </div>

        <div className="MyNavbarAuthLinks">
          {/* Login/Signup when logged out */}
          {!user ? (
            <>
              <NavLink to="/login" className="loginText">Login</NavLink>
              <NavLink to="/signup" className="loginText">Sign Up</NavLink>
            </>
          ) : (
            /* Logout when logged in */
            <button onClick={handleLogout} className="logoutButton">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;