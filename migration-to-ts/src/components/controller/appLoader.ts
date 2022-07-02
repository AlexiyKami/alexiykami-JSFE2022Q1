import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '91be3949de5c458aa54231f1a8abf5e4', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
