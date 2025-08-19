import {
  NewsApiOrgArticle,
  NewsApiOrgResponse,
} from "@/lib/providers/NewsApiOrg/NewsApiOrgArticle";
import { ProviderConfig } from "@/lib/types/NewsConfig";
import {
  NewsProvider,
  NewsQueryParams,
  NewsResponse,
} from "@/lib/types/NewsProvider";
import axios, { AxiosResponse } from "axios";

class NewsApiOrgProvider implements NewsProvider {
  constructor(private config: ProviderConfig["config"]) {}

  getName(): string {
    return "NewsApiOrg";
  }

  async fetchNews(params: NewsQueryParams): Promise<NewsResponse> {
    const sourcesResponse = await axios.get(`${this.config.baseUrl}/sources`, {
      params: { apiKey: this.config.apiKey },
    });
    const sources = sourcesResponse.data.sources as {
      country: string;
      id: string;
    }[];

    const sourcesParams = sources
      .filter(({ country }) => country === "us")
      .slice(0, 20)
      .map(({ id }) => id)
      .join(",");

    const newsResponse: AxiosResponse<NewsApiOrgResponse> = await axios.get(
      `${this.config.baseUrl}/everything`,
      {
        params: this.transformParams({ source: sourcesParams, ...params }),
      }
    );
    return this.transformResponse(newsResponse.data);
  }

  private transformParams(params: NewsQueryParams) {
    return {
      apiKey: this.config.apiKey,
      sources: params.source,
      pageSize: params.pageSize,
      page: params.page,
    };
  }

  private transformResponse(data: NewsApiOrgResponse): NewsResponse {
    return {
      articles: data.articles.map(this.mapArticle),
      total: data.totalResults,
    };
  }

  private mapArticle(article: NewsApiOrgArticle) {
    return {
      title: article.title,
      description: article.description,
      datetime: article.publishedAt,
      source: article.source.name,
      url: article.url,
      author: article.author,
      image: article.urlToImage,
    };
  }
}

export default NewsApiOrgProvider;
