import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "./utils/api";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      const { data } = await apiFetch(`http://localhost:5000/articles/${id}`);
      setArticle(data);
    }
    fetchArticle();
    console.log(article);
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    
    <h1>HELLO!</h1>
  );
}

export default Article;