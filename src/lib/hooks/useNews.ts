import { useEffect, useState } from "react";
import providersConfig from "../config/providers-config";
import GuardianProvider from "../providers/Guardian/GuardianProvider";
import NewsApiAIProvider from "../providers/NewsApiAI/NewsApiAIProvider";
import NewsApiOrgProvider from "../providers/NewsApiOrg/NewsApiOrgProvider";
import NewsProviderFactory from "../services/NewsProviderFactory";
import NewsService from "../services/NewsService";
import { NewsQueryParams, NewsResponse } from "../types/NewsProvider";

NewsProviderFactory.register("NewsApiAI", NewsApiAIProvider);
NewsProviderFactory.register("Guardian", GuardianProvider);
NewsProviderFactory.register("NewsApiOrg", NewsApiOrgProvider);

const newsService = new NewsService(providersConfig);

interface NewsFilter {
  provider?: string;
  page: number;
}

export const useNews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [news, setNews] = useState<NewsResponse>();
  const [filters, setFilters] = useState<NewsFilter>({
    page: 1,
    provider: providersConfig.defaultProvider,
  });

  const prepareParams = (): NewsQueryParams => {
    const newsApiAIQuery = {
      $query: {
        $and: [
          {
            lang: "eng",
          },
        ],
      },
    };

    return {
      pageSize: 12,
      page: filters.page,
      query: filters.provider === "NewsApiAI" ? newsApiAIQuery : undefined,
    };
  };

  const loadNews = async () => {
    try {
      setIsLoading(true);
      const params = prepareParams();
      const response = await newsService.getNews(params, filters?.provider);
      setNews(response);
    } catch (e) {
      setError(String(e));
    }
    setIsLoading(false);
  };

  const onFilterChange = (updatedFilter: Partial<NewsFilter>) => {
    setFilters((prev) => ({ ...prev, ...updatedFilter }));
  };

  useEffect(() => {
    loadNews();
  }, [filters]);

  return {
    isLoading,
    error,
    news,
    allProviders: NewsProviderFactory.getAvailableProviders(),
    filters,
    onFilterChange,
  };
};
