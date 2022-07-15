import Loader from './loader';

const urlLink = 'https://nodenews.herokuapp.com/';
const apiKey = '91be3949de5c458aa54231f1a8abf5e4';

class AppLoader extends Loader {
    constructor() {
        super(urlLink, {
            apiKey: apiKey, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
