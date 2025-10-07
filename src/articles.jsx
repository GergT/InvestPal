import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "./utils/api";
import './articles.css';
import nameChanger from "./utils/nameChanger";
import ReactMarkdown from "react-markdown";


function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
        console.log("Fetching article with ID (frontend):", articleId);
        const  res = await apiFetch(`http://localhost:5000/articles/${articleId}`);
        const data = await res.json();
        //setArticle(data);
        console.log("Fetched article data:");
        console.log(data);
        setArticle(data);
    }
    fetchArticle();

  }, [articleId]);

  if (!article) return <p>Loading...</p>;
  else{
    article.author = nameChanger(article.author);
  }

  return (
    <div className="article-page">
        <div className="article-header">
            <h1 id="article-title">{article.title}</h1>
            <button onClick={() => window.history.back()} className="back-button"> &larr; Back</button>
        </div>
        <div className="article-content">
            <p className="article-author">By {article.author}</p>
            <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
    </div>
  );
}

export default Article;