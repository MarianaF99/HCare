import NavLinksView from '../js/views/NavLinksView.js'
import AdminView from '../js/views/AdminView.js'
import RegisterView from '../js/views/RegisterView.js'
import EditProfileView from '../js/views/EditProfileView.js'

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
                new NavLinksView()
                break;
            case 'editProfile.html':
                new EditProfileView()
                new NavLinksView()
                break;
            case 'register.html':
                new NavLinksView()
                new RegisterView()
                break;
            case 'admin.html':
                new AdminView()
                break;
            case 'ratings.html':
                new EditProfileView()
                new NavLinksView()
                break;    
            default:
                break;
        }
    }
}

new App()