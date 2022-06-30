export interface IDataArticles {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface IDataSources {
  sources: ISource[];
  status: string;
}

export interface IArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
      id: string;
      name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface ISource {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}