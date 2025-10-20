import { NavLink } from 'react-router-dom';
import './navbar.css';
import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';




function MyNavbar( ) {
  const [loginStatus, setLoginStatus] = useState(false);
  async function handleLogout() {
    setLoginStatus(false);
    await apiFetch('http://localhost:5000/logout', {
      method: 'POST',
    });
    window.location.href = '/';
  }

  useEffect(() => {
    async function fetchToken() {
      const loginCheck = await apiFetch('http://localhost:5000/verifyToken', {
        method: 'POST',
      });
      if (loginCheck.status !== 200) {
        setLoginStatus(false);
      } else {
        setLoginStatus(true);
      }
    }
    fetchToken();
  }, [setLoginStatus]);

  return (
    <nav>
      <div className="MyNavbar">

        <NavLink to="/" end>
          <img id="navLogo" src="/Logo.png" alt="InvestiSmart Logo" />
        </NavLink>

        <div className="MyNavbarLinks">

          {loginStatus && (
            <>
              <NavLink to="/feed" className="dashboardText">Your Feed</NavLink>
              <NavLink to="/portfolio" className="portfolioText">Your Portfolio</NavLink>
            </>
          )}
        </div>

        <div className="MyNavbarAuthLinks">
          {/* Login/Signup when logged out */}
          {!loginStatus ? (
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