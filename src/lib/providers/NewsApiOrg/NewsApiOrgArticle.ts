interface Source {
  id: string;
  name: string;
}

export interface NewsApiOrgArticle {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}

export interface NewsApiOrgResponse {
  status: string;
  totalResults: number;
  articles: NewsApiOrgArticle[];
}
