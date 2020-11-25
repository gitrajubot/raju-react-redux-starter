
import LoginSignupPage from './pages/loginSignupPage';


class Router {
    constructor() {
        console.log('routes constructors');
        // this.setRoutes();
        this.routes = [
            { path: '/loginSignupPage', component: LoginSignupPage },
            
            { path: '/', exact: true, redirectTo:  '/loginSignupPage' }
        ];
        
    }    
}
export default Router;
