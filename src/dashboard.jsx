import './dashboard.css';
import FileUploader from './components/fileuploader.jsx';
import { useState, useEffect } from 'react';


function Dashboard() {
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
                {portfolioData && <pre>{JSON.stringify(portfolioData, null, 2)}</pre>}

            </main> 
        </div>
    );
}

export default Dashboard;
