"use client";

import { Article } from "@/types/article";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ArticleDetails = () => {
  const params = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article>();
  const fetchNews = async () => {
    console.log({ slug: params.slug });
    const newsResponse = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        apiKey: "c1a35f605ae04659866dd7f8cfe52758",
        q: decodeURIComponent(params.slug),
        searchIn: "title",
        pageSize: 10,
      },
    });
    const news = newsResponse.data.articles as Article[];
    if (news.length) {
      setArticle(news[0]);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return <div>{params.slug}</div>;
};

export default ArticleDetails;
