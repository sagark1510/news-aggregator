"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import { Article } from "@/types/article";

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const fetchNews = async () => {
    const sourcesResponse = await axios.get(
      "https://newsapi.org/v2/top-headlines/sources?apiKey=c1a35f605ae04659866dd7f8cfe52758"
    );
    const sources = sourcesResponse.data.sources;
    console.log({ sources });
    const sourcesParams = sources
      .filter(({ country }) => country === "us")
      .slice(0, 20)
      .map(({ id }) => id)
      .join(",");
    const newsResponse = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        apiKey: "c1a35f605ae04659866dd7f8cfe52758",
        sources: sourcesParams,
        pageSize: 10,
      },
    });
    const news = newsResponse.data.articles as Article[];
    setArticles(news);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {articles.map((article) => (
        <Card article={article} key={article.url} />
      ))}
    </div>
  );
};

export default Home;
