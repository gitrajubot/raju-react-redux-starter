import { combineReducers } from 'redux';
import SocialLoginReducer from './SocialLoginReducer';
import AddPhoneNoReducer from './AddPhoneNoReducer';
import GetConfigurationReducer from './GetConfigurationReducer';
import OtpVerificationReducer from './OtpVerificationReducer';
import GetProfileReducer from './GetProfileReducer';
import LogoutReducer from './LogoutReducer';
import PasswordReducer from './PasswordReducer';
import LoginReducer from './LoginReducer';



const rootReducer = combineReducers({
    SocialLoginReducer,
    AddPhoneNoReducer,
    GetConfigurationReducer,
    OtpVerificationReducer,
    GetProfileReducer,
    LogoutReducer,
    PasswordReducer,
    LoginReducer
})

export default rootReducer;