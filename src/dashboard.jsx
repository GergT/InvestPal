import './dashboard.css';
import { useState, useEffect, useRef } from 'react';
import { apiFetch } from './utils/api';
import { Link } from 'react-router-dom';
import nameChanger from './utils/nameChanger';


function Dashboard( ) {
    const isFetched = useRef(false); // to prevent double fetch in development mode
    const [articles, setArticles] = useState([]);

    async function articlesFetch() {
            try {
                const res = await apiFetch("http://localhost:5000/articles", {
                    method: "GET",
                });
                if (res.ok) {
                    const data =  await res.json();
                    setArticles(data);  
                };
            } catch (err) {
                console.error("Error fetching articles:", err);

            }
        } 

    useEffect(() => {
        if (!isFetched.current) {
            articlesFetch();
            isFetched.current = true;
        }
    }, []);







    
    return (
        <div className = "Dashboard">
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap');
            </style>
            <main>
                <h1>Articles from our talented Analysts</h1>
                <div className='articles-container'>
                {articles.length === 0 ? (
                    <p>No articles available.</p>
                ) : (
                    articles.map((article) => (
                        <Link to={`/feed/${article._id}`} key={article._id} className="article">
                        <div key={article._id}  >
                            <h2>{article.title}</h2>
                            <p>{article.topics.join(", ")}</p>
                            <p>{nameChanger(article.author)}</p>
                            <img src={`/${article.author}.jpg`} className = "author-image"/>
                        </div>
                    </Link>
                    ))
                )}
                </div>

            </main> 
        </div>
    );
}

export default Dashboard;
