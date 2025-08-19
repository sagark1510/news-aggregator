import { Article } from "./Article";

export interface NewsProvider {
  getName(): string;
  fetchNews(params: NewsQueryParams): Promise<NewsResponse>;
}

export interface NewsQueryParams {
  page?: number;
  pageSize?: number;
  source?: string;
  query?: any;
}

export interface NewsResponse {
  articles: Article[];
  total: number;
}
