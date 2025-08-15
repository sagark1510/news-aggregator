"use client";

import React, { useState } from "react";
import Card from "@/components/Card";
import { useNews } from "@/lib/hooks/useNews";
import Loader from "@/components/Loader";
import Dropdown from "@/components/Dropdown";

const Home = () => {
  const newsApiAIQuery = {
    $query: {
      $and: [
        {
          lang: "eng",
        },
      ],
    },
  };

  const { isLoading, news, error, allProviders, filters, onFilterChange } =
    useNews({
      pageSize: 10,
      query: newsApiAIQuery,
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!news?.articles.length || error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-xl text-center text-red-500">
          {error || "No news articles found for the search"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dropdown
          placeholder="Provider"
          value={filters.provider}
          onChange={(provider) => onFilterChange({ provider })}
          options={allProviders}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {news.articles.map((article) => (
          <Card article={article} key={article.url} />
        ))}
      </div>
    </div>
  );
};

export default Home;
