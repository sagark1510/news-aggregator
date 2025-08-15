import {
  NewsApiAIArticle,
  NewsApiAIResponse,
} from "@/lib/providers/NewsApiAI/NewsApiAIArticle";
import { ProviderConfig } from "@/lib/types/NewsConfig";
import {
  NewsProvider,
  NewsQueryParams,
  NewsResponse,
} from "@/lib/types/NewsProvider";
import axios, { AxiosResponse } from "axios";

class NewsApiAIProvider implements NewsProvider {
  constructor(private config: ProviderConfig["config"]) {}

  getName(): string {
    return "NewsApiAI";
  }

  async fetchNews(params: NewsQueryParams): Promise<NewsResponse> {
    const newsResponse: AxiosResponse<NewsApiAIResponse> = await axios.post(
      `${this.config.baseUrl}/article/getArticles`,
      this.transformParams(params)
    );
    return this.transformResponse(newsResponse.data);
  }

  private transformParams(params: NewsQueryParams) {
    return {
      query: params.query,
      resultType: "articles",
      articlesSortBy: "date",
      apiKey: this.config.apiKey,
      articlesCount: params.pageSize || 10,
    };
  }

  private transformResponse(data: NewsApiAIResponse): NewsResponse {
    return {
      articles: data.articles.results.map(this.mapArticle),
      total: data.articles.totalResults,
    };
  }

  private mapArticle(article: NewsApiAIArticle) {
    return {
      title: article.title,
      description: article.body,
      datetime: article.dateTime,
      source: article.source.title,
      url: article.url,
      image: article.image,
      author: article.authors.length
        ? article.authors.map(({ name }) => name).join(",")
        : "",
    };
  }
}

export default NewsApiAIProvider;
