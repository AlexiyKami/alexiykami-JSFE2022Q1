export enum statusCode {
    badRequest = 400,
    unauthorized,
    notFound = 404,
    tooManyRequests = 429,
    serverError = 500,
}

export type VoidCallback<T> = (data?: T) => void;

export type endpointObj = {
    endpoint: string;
    options?: UrlOptions;
};

export type UrlOptions = {
    [prop: string]: string;
};

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
