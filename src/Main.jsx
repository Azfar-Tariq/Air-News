import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import NewsGrid from "./components/NewsGrid";

import "./Main.css";

function Main() {


  //this UuseState() hook will fetch data from the API
  const [items, setItems] = useState([]);

  //this UseState() hook will contain IDs of menu links which user will click on
  const [active, setActive] = useState(1);

  //this UeState() hook will contain Category of news. It will be 'general category' in the beginning
  const [category, setCategory] = useState("general");

  useEffect(() => {
    // fetch(`https://gnews.io/api/v4/top-headlines?country=pk&category=${category}&apikey=0bdadb3c68aceddbabac6675b97815c7`)
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=ab416ca98b044518a736c854739fc555`
    )
      //converting from .JSON to Object form
      .then((res) => res.json())
      //then adding the data to our items
      .then((data) => setItems(data.articles));
  }, [category]);

  return (
       <div className="App">
        <h1 className="title">See the Latest News on</h1>
        <h1 className="title"> Air News</h1>
        <Menu active={active} setActive={setActive} setCategory={setCategory} />

        <NewsGrid items={items} />
      </div>
  );
}

export default Main;
