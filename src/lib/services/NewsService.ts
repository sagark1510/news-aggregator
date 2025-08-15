import { NewsConfig } from "@/lib/types/NewsConfig";
import {
  NewsProvider,
  NewsQueryParams,
  NewsResponse,
} from "@/lib/types/NewsProvider";
import NewsProviderFactory from "./NewsProviderFactory";

class NewsService {
  private providers: Map<string, NewsProvider> = new Map();
  private defaultProvider: string;

  constructor(private config: NewsConfig) {
    this.config.providers.forEach((providerConfig) => {
      if (!providerConfig.enabled) {
        return;
      }
      const provider = NewsProviderFactory.create(
        providerConfig.name,
        providerConfig.config
      );
      this.providers.set(providerConfig.name, provider);
    });
    this.defaultProvider = this.config.defaultProvider;
  }

  async getNews(
    params: NewsQueryParams,
    providerName?: string
  ): Promise<NewsResponse> {
    const provider = this.getProvider(providerName);
    return await provider.fetchNews(params);
  }

  private getProvider(name?: string): NewsProvider {
    const providerName = name || this.defaultProvider;
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Provider ${providerName} not available`);
    }
    return provider;
  }
}

export default NewsService;
