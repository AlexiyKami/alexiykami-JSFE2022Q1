import { VoidCallback, UrlOptions, statusCode } from './../../types/index';

class Loader {
    private baseLink: string;
    private options: UrlOptions;
    constructor(baseLink: string, options: UrlOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        { endpoint = '', options = {} },
        callback: VoidCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === statusCode.unauthorized || res.status === statusCode.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: UrlOptions, endpoint: string) {
        const urlOptions: UrlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: VoidCallback<T>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => (res as Response).json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
