import UserView from '../js/views/UserView.js'
import AdminView from '../js/views/AdminView.js'

class App {
    constructor() {
        this._InstantiateView()
    }

    _InstantiateView() {
        const webPath = window.location.pathname
        const htmlFile = webPath.substr(webPath.lastIndexOf('/') + 1)

        switch (htmlFile) {
            case '':
            case 'index.html':
            case 'editProfile.html':
            case 'register.html':
                new UserView()
                break;
            case 'admin.html':
                new AdminView()
                break;
            default:
                break;
        }
    }
}

new App()