import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import NewsGrid from "./components/NewsGrid";
import "./Main.css";

function Main() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&page=${page}&max=10&apikey=0bdadb3c68aceddbabac6675b97815c7`
      );
      const data = await response.json();
      if (data.articles.length === 0) {
        setHasMore(false);
      } else {
        setItems(prevItems => [...prevItems, ...data.articles]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    fetchNews();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        fetchNews();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="App">
      <h1 className="title">See the Latest News on</h1>
      <h1 className="title"> Air News</h1>
      <Menu active={active} setActive={setActive} setCategory={setCategory} />
      <NewsGrid items={items} />
      {loading && <p>Loading more news...</p>}
      {!hasMore && <p>No more news to load.</p>}
    </div>
  );
}

export default Main;
