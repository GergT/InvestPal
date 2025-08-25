import { NavLink } from 'react-router-dom';
import './navbar.css';

function MyNavbar() {
    return (
        <nav>
            <div className="MyNavbar">
                <div className="MyNavbarLinks">
                    <NavLink to="/" end>
                        <img src="/Logo.png" alt="InvestiSmart Logo" />
                    </NavLink>
                    <NavLink to="/" end className="homeText">
                        Home
                    </NavLink>
                    <NavLink to="/portfolio" className="portfolioText">
                        Your Portfolio
                    </NavLink>
                </div>
                <div className = "MyNavbarAuthLinks">
                    <NavLink to="/login" className="loginText">
                        Login
                    </NavLink>
                    <NavLink to="/signup" className="loginText">
                        Sign Up
                    </NavLink>
                </div>
                
            </div>
        </nav>
    );
}

export default MyNavbar;