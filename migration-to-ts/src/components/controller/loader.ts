import { VoidCallback, UrlOptions, statusCode, endpointObj } from './../../types/index';

class Loader {
    private baseLink: string;
    private options: UrlOptions;
    constructor(baseLink: string, options: UrlOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        obj: endpointObj,
        callback: VoidCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', obj.endpoint, callback, obj.options as UrlOptions);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (Object.keys(statusCode).includes(res.status.toString())) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: UrlOptions, endpoint: string): string {
        const urlOptions: UrlOptions = { ...this.options, ...options };
        const url = `${this.baseLink}${endpoint}?`;

        return Object.keys(urlOptions)
            .reduce((total: string, curr: string) => {
                return total + `${curr}=${urlOptions[curr]}&`;
            }, url)
            .slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: VoidCallback<T>, options: UrlOptions): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
