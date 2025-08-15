import { Article } from "./article";

export interface NewsProvider {
  getName(): string;
  fetchNews(params: NewsQueryParams): Promise<NewsResponse>;
  //   mapArticle(article: any): Article;
}

export interface NewsQueryParams {
  pageSize?: number;
  source?: string;
  query?: any;
}

export interface NewsResponse {
  articles: Article[];
  total: number;
}
