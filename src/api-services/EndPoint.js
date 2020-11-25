
const base_URL = 'https://auth-template-node-final.herokuapp.com/';  



export const routers = {
    
    getconfig: 'getconfig',
    
}
export const getUrl = (key) => {
    return base_URL + key;
} 
