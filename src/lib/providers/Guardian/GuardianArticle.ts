export interface GuardianArticle {
  id: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
}

export interface GuardianResponse {
  response: {
    status: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianArticle[];
  };
}
