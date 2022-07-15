import { IDataArticles, IDataSources, VoidCallback } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews<IDataArticles>(e, this.view.drawNews.bind(this.view) as VoidCallback<IDataArticles>)
        );
        (document.querySelector('.themes-buttons') as HTMLElement).addEventListener('click', (e: MouseEvent) =>
            this.controller.getTopHeadlines<IDataArticles>(
                e,
                this.view.drawNews.bind(this.view) as VoidCallback<IDataArticles>
            )
        );
        this.controller.getSources<IDataSources>(this.view.drawSources.bind(this.view) as VoidCallback<IDataSources>);
    }
}

export default App;
