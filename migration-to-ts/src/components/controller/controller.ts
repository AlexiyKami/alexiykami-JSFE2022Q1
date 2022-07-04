import { VoidCallback } from './../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources<T>(callback: VoidCallback<T>): void {
        super.getResp<T>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: VoidCallback<T>): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId as string);
                    super.getResp<T>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId as string,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    public getTopHeadlines<T>(e: Event, callback: VoidCallback<T>): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('theme-button__item')) {
                const theme: string | null = target.getAttribute('data-theme');
                if (newsContainer.getAttribute('data-theme') !== theme) {
                    newsContainer.setAttribute('data-theme', theme as string);
                    super.getResp<T>(
                        {
                            endpoint: 'top-headlines',
                            options: {
                                category: theme as string,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
