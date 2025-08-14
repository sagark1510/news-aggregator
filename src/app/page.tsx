"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import { Article } from "@/types/article";
import { GuardianArticle } from "@/types/GuardianArticle";
import { NewsApiAIArticle } from "@/types/NewsApiAIArticle";

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const fetchNewsApiOrg = async () => {
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

  const fetchGuardianNews = async () => {
    const newsResponse = await axios.get(
      "https://content.guardianapis.com/search",
      {
        params: {
          "api-key": "1bb51a1d-4d4a-41db-8291-7b787c4e3afb",
        },
      }
    );
    const news = newsResponse.data.response.results as GuardianArticle[];
    const formattedNews: Article[] = news.map((item) => ({
      title: item.webTitle,
      description: "",
      publishedAt: item.webPublicationDate,
      source: {
        id: "Guardian",
        name: "The Gaurdian",
      },
      url: item.webUrl,
      urlToImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp15Q0fuxA016kqjJ4kbS_20EpMa3IY1-5DQ&s",
    }));
    setArticles(formattedNews);
  };

  const fetchNewsApiAI = async () => {
    const newsResponse = await axios.post(
      "https://eventregistry.org/api/v1/article/getArticles",
      {
        query: {
          $query: {
            $and: [
              {
                lang: "eng",
              },
            ],
          },
        },
        resultType: "articles",
        articlesSortBy: "date",
        apiKey: "e039edcb-d62e-41ee-bca1-b1d64f2f8b5d",
        articlesCount: 10,
      }
    );
    const news = newsResponse.data.articles.results as NewsApiAIArticle[];
    const formattedNews: Article[] = news.map((item) => ({
      title: item.title,
      description: item.body,
      publishedAt: item.dateTime,
      source: {
        id: item.source.uri,
        name: item.source.title,
      },
      url: item.url,
      urlToImage:
        item.image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp15Q0fuxA016kqjJ4kbS_20EpMa3IY1-5DQ&s",
      author: item.authors.length
        ? item.authors.map(({ name }) => name).join(",")
        : "",
    }));
    setArticles(formattedNews);
  };

  useEffect(() => {
    fetchNewsApiAI();
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
