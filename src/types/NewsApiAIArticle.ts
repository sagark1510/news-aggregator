interface Source {
  uri: string;
  dataType: string;
  title: string;
}

interface Author {
  uri: string;
  name: string;
  type: string;
  isAgency: boolean;
}

export interface NewsApiAIArticle {
  isDuplicate: boolean;
  dateTime: string;
  url: string;
  title: string;
  body: string;
  source: Source;
  authors: Author[];
  image: string;
}
