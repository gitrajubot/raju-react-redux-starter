
import TablePage from './pages/tablePage'


class Router {
    constructor() {
        this.routes = [
            { path: '/tablePage', component: TablePage },
            { path: '/', exact: true, redirectTo:  '/tablePage' }
        ];
        
    }    
}
export default Router;
