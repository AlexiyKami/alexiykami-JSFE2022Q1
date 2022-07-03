import { IDataArticles, IDataSources } from '../../types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<IDataArticles>) {
        this.news.draw(data.articles);
    }

    public drawSources(data: Readonly<IDataSources>) {
        this.sources.draw(data.sources);
    }
}

export default AppView;
