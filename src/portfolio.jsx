import './portfolio.css';
import FileUploader from './components/fileuploader.jsx';
import { useState, useEffect } from 'react';

function Portfolio() {

        const [portfolioData, setPortfolioData] = useState(null); // state for fetched data
        const token = localStorage.getItem("token");
    
        useEffect(() => {
            async function portfolioFetch() {
                try {
                    const res = await fetch("http://localhost:5000/portfolio", {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` }
                    });
    
                    if (res.ok) {
                        const data = await res.json();
                        setPortfolioData(data); // update state
                        console.log("My portfolio data:", data);
                    };
                } catch (err) {
                    console.error("Error fetching portfolio:", err);
                }
            }
    
            portfolioFetch();
        }, [token]);
    

    return (

        <div>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap');
            </style>


            <main>
                {portfolioData === null && <h1>Upload a CSV file here to get started!</h1>}
                {portfolioData === null && <FileUploader className="fileUploader" />}
                {portfolioData && (
                <div>
                    <h2>{portfolioData.username}'s Portfolio</h2>
                    <table>
                    <thead>
                        <tr>
                        <th>Code</th>
                        <th>Stock</th>
                        <th>Units</th>
                        <th>Price (p)</th>
                        <th>Value (£)</th>
                        <th>Cost (£)</th>
                        <th>Gain/Loss (£)</th>
                        <th>Gain/Loss (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioData.holdings.map((h, index) => (
                        <tr key={index}>
                            <td>{h.code}</td>
                            <td>{h.stock}</td>
                            <td>{h.units}</td>
                            <td>{h.pricePence}</td>
                            <td>{h.value}</td>
                            <td>{h.cost}</td>
                            <td>{h.gainLoss}</td>
                            <td>{h.gainLossPercent}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                )}
            </main>


            {portfolioData && <h1>Made any Changes to your Portfolio? Upload a fresh CSV file here!</h1>}
            {portfolioData && <FileUploader className="fileUploader" />}
        </div>
    );
}

export default Portfolio;
