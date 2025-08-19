import './navbar.css';

function MyNavbar() {
    return (
        <nav>
            <div className="MyNavbar">
                <div className="MyNavbarLinks">

                    <img src ="/Logo.png" alt="InvestiSmart Logo"></img>
                    <a href="#Home">Home</a>
                    <a href="#YourPortfolio">Your Portfolio</a>
                    <a href="#TheMarkets">The Markets</a>
                </div>
            </div>
        </nav>)
}

export default MyNavbar;