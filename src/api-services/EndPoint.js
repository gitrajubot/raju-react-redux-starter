
const base_URL = 'https://auth-template-node-final.herokuapp.com/';  
// const base_URL = 'http://192.168.1.7:5001/';
// const base_URL = 'http://192.168.31.110:5001/';
// const base_URL = 'http://192.168.43.16:5001/'



export const routers = {
    login: 'sociallogin ',
    emailSignUp: 'signup',
    logout: 'logout',
    getProfile:  'getprofile',
    addPhoneNo: 'addPhoneNo',
    otpVerification: 'otpVerification',
    getconfig: 'getconfig',
    forgotPassword:'confirmforgotpassword',
    emailVerify: 'forgotpassword',
    resetPassword: 'resetpassword', 
    emailLogin: 'login',
    editProfile: 'editprofile',
    resendOtp:'resendotp',
    
}
export const getUrl = (key) => {
    return base_URL + key;
} 
