"use client";

import React from "react";
import NewsArticle from "@/components/NewsArticle";
import { useNews } from "@/lib/hooks/useNews";
import Loader from "@/components/Loader";
import Dropdown from "@/components/Dropdown";
import Pagination from "@/components/Pagination";

const Home = () => {
  const { isLoading, news, error, allProviders, filters, onFilterChange } =
    useNews();

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
          placeholder="Source"
          value={filters.provider}
          onChange={(provider) => onFilterChange({ provider, page: 1 })}
          options={allProviders}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {news.articles.map((article) => (
          <NewsArticle article={article} key={article.url} />
        ))}
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={filters.page}
          totalPages={news.total}
          onPageChange={(page) => onFilterChange({ page })}
          className="mb-8"
        />
      </div>
    </div>
  );
};

export default Home;
