import { Article } from "@/types/article";
import { humanizeDate } from "@/utils/date";
import Link from "next/link";
import React from "react";

interface CardProps {
  article: Article;
}

const Card: React.FC<CardProps> = ({ article }) => {
  return (
    <Link
      href={`/article/${article.title}`}
      className="dark:-outline-offset-1 outline outline-black/5 dark:outline-white/10 max-w-sm rounded-xl overflow-hidden shadow-lg"
    >
      <img className="w-full" src={article.urlToImage} alt={article.title} />
      <div className="flex flex-col px-6 py-4 gap-4">
        <div className="flex justify-between">
          <p className="text-gray-600 text-xs dark:text-gray-300">
            by {article.author}
          </p>
          <p className="text-gray-500 text-xs dark:text-gray-300">
            {humanizeDate(article.publishedAt)}
          </p>
        </div>
        <div
          aria-label={article.title}
          className="text-xl font-medium text-black dark:text-white"
        >
          {article.title}
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          {article.description.substring(0, 100)}
        </p>
      </div>
    </Link>
  );
};

export default Card;
