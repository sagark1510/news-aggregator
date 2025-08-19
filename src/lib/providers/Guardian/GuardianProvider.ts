import {
  GuardianArticle,
  GuardianResponse,
} from "@/lib/providers/Guardian/GuardianArticle";
import { ProviderConfig } from "@/lib/types/NewsConfig";
import {
  NewsProvider,
  NewsQueryParams,
  NewsResponse,
} from "@/lib/types/NewsProvider";
import axios, { AxiosResponse } from "axios";

class GuardianProvider implements NewsProvider {
  constructor(private config: ProviderConfig["config"]) {}

  getName(): string {
    return "Guardian";
  }

  async fetchNews(params: NewsQueryParams): Promise<NewsResponse> {
    const newsResponse: AxiosResponse<GuardianResponse> = await axios.get(
      `${this.config.baseUrl}/search`,
      {
        params: this.transformParams(params),
      }
    );
    return this.transformResponse(newsResponse.data);
  }

  private transformParams(params: NewsQueryParams) {
    return {
      "api-key": this.config.apiKey,
      page: params.page,
      "page-size": params.pageSize,
    };
  }

  private transformResponse(data: GuardianResponse): NewsResponse {
    return {
      articles: data.response.results.map(this.mapArticle),
      total: data.response.total,
    };
  }

  private mapArticle(article: GuardianArticle) {
    return {
      title: article.webTitle,
      description: "",
      datetime: article.webPublicationDate,
      source: "The Gaurdian",
      url: article.webUrl,
    };
  }
}

export default GuardianProvider;
