import React, { Component } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';

import MaterialInput from './../components/materialInput'
import { Google_Client_Id, Facebook_Id } from '../constant';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import swal from '@sweetalert/with-react'
import { toast } from 'react-toastify';

import { SocialLoginAction } from './../actions/SocialLoginAction'
import { OtpVerificationAction } from './../actions/OtpVerificationAction'
import { signUpAction } from '../actions/LoginAction';

import { connect } from 'react-redux';
import CountryList from './../assets/countries.json';

import '../App.scss';
import './../scss/login.scss';
import '../Global.scss'


class SignUp extends Component {

    constructor(props) {
        super(props);
        console.log('sign up constructorrrrrrrrrrrrr', props.GetConfigurationReducer.configData)
        this.state = {
            iconToggle: false,
            otp_validation: props.GetConfigurationReducer.configData.appConfig.otpValidation,
            urlValidation: props.GetConfigurationReducer.configData.urlValidation,
            fieldDetail: props.GetConfigurationReducer.configData.appConfig.inputSection,
            buttonDetail: props.GetConfigurationReducer.configData.appConfig.buttonSection,
            brandDetail: props.GetConfigurationReducer.configData.appConfig.brandSection,
            data: {},
            mobile: {},
            PhoneNoCode:false
        };
    }


    componentDidMount() { 
        this.createValidArr();
        this.findPhone();
    }


    handleChange(event, name) {
        this.setState({ [name]: event.target.value });
    }

    createValidArr() {
        var validArr = JSON.parse(JSON.stringify(this.state.fieldDetail))
        this.state.fieldDetail.map((e, i) => {
            validArr[i].valid = e.required ? false : true
        })
        console.log('map er porer console')
        this.setState({ fieldDetail: validArr }, () => {
            console.log('in validarr callback')

        })
    }

    findPhone() {
        const obj = this.state.fieldDetail.find((e) => e.key === 'phoneNo')
        console.log('hghgdhgdhgd *--------> ', obj);
        if (obj) {
            console.log('ifffffffffffffffffffff', obj)
            this.setState({
                isPhone: true,
                isPhoneLoading: true
            })
            console.log('hghgdhgdhgd *--------> no 2 ', obj);
            obj.country && this.setCountryCode(obj.country);

        }
    }

    responseGoogle = (response) => {
        console.log('Google', response);
        if (response.tokenId) {
            this.setState({
                tokenid: response.tokenId,
            })
            this.afterLogin(response.tokenId, 'Google')
        }
    }

    responseFacebook = (response) => {
        console.log('facebook', response);
        if (response.accessToken) {
            this.setState({
                accessToken: response.accessToken,
                facebookId: response.id,
            })
            this.afterLogin(response.accessToken, 'Facebook')
        }
    }


    toggleDisplay(i) {
        var copy = JSON.parse(JSON.stringify(this.state.fieldDetail))
        copy[i].displayIcon = !copy[i].isSecured ? "fas fa-eye" : "fas fa-eye-slash"
        copy[i].isSecured = !copy[i].isSecured;
        this.setState({
            fieldDetail: copy
        });
    }

    afterLogin(data, type) {
        data = {
            providers: type,
            accessToken: data,
        }
        this.props.dispatch(SocialLoginAction(data, (response) => {
            console.log("social login response", response);
            if (response.user._id) {
                this.setState({
                    UserId: response.user._id
                }, () => {
                    if (this.state.fieldDetail.find((e) => (e.key === 'phoneNo'))) {
                        if (!response.user.phoneNo) {
                            this.props.history.push({ pathname: '/addPhoneNo', state: { userId: response.user._id } })
                        }
                        else {
                            toast.error("You are already registered")
                        }
                    }
                    else {
                        this.props.history.push(`/loginSignupPage`)
                    }
                })
            }
        }))
    }



    handleOnChange(ele, i, event) {
        console.log('value, key', event.target.value, ele.key)

        var copyArr = JSON.parse(JSON.stringify(this.state.fieldDetail))
        var pattern = ele.regex ? new RegExp(ele.regex) : null
        if (ele.required) {
            copyArr[i].valid = event.target.value ? true : false
        }
        if (pattern) {
            console.log('pattern', pattern)
            copyArr[i].isError = event.target.value ? !pattern.test(event.target.value) : false
        }

        if (ele.key === 'password') {
            if (this.state.data.confirmPassword) {
                if (event.target.value !== this.state.data.confirmPassword) {
                    copyArr[i].matchError = event.target.value && 'Both passwords should be same';
                } else {
                    copyArr[i].matchError = null
                    const idx = copyArr.findIndex(ele => ele.key === 'confirmPassword');
                    copyArr[idx].matchError = null

                }

            }
        } else if (ele.key === 'confirmPassword') {
            if (this.state.data.password) {
                if (event.target.value !== this.state.data.password) {
                    copyArr[i].matchError = event.target.value && 'Both passwords should be same'
                } else {
                    copyArr[i].matchError = null
                    const idx = copyArr.findIndex(ele => ele.key === 'password');
                    copyArr[idx].matchError = null
                }
            }
        } else if (ele.key === 'phoneNo') {
            this.setState({
                mobile: { ...this.state.mobile, code: this.state.countryCode ? this.state.countryCode : null, number: event.target.value }
            }, () => {
                console.log('mobile save in state', this.state.mobile)
                this.setState({
                    fieldDetail: copyArr,
                    data: { ...this.state.data, [ele.key]: this.state.mobile }
                })
            })
        }

        !(ele.key === 'phoneNo') && this.setState({
            fieldDetail: copyArr,
            data: { ...this.state.data, [ele.key]: event.target.value }
        }, () => console.log('state data', this.state.data))

    }

    onHandleSignUp() {
        this.props.dispatch(signUpAction(this.state.data, (response) => {
            console.log('state data, for check no, sign up pg', this.state.data)
            console.log("sign-up consoleeeeeeeeee", response)
            if (response.success) {
                console.log("success if")
                if (this.state.otp_validation) {
                    console.log(" if otp validation")
                    if (this.state.data.phoneNo) {
                        console.log(" if phone no")
                        this.setState({ UserId: response.user._id }, () => {
                            this.props.history.push({
                                pathname: '/otpVerification', state: {
                                    userId: response.user._id, code: this.state.countryCode,
                                    number: this.state.mobile.number
                                }
                            })
                        })

                    }
                    else {
                        if (this.state.urlValidation) {
                            alert('Verification link is send to your E-mail')
                            this.props.history.push(`loginSignupPage`);
                        }
                        else {
                            alert('OTP is send to your E-mail')
                            this.setState({ iseMailOtp: true }, () => {
                                this.props.history.push({ pathname: '/otpVerification', state: {userId: response.user._id, iseMailOtp: true, mail: this.state.data.email } })
                            })

                        }
                    }
                } else {
                    console.log("no otp validation")
                    this.props.history.push(`loginSignupPage`);
                }
            }
        }));
    };

    setCountryCode(country) {
        const obj = CountryList.find((e) => {
            if (e.name.toLowerCase().split(' ')[0] === country.toLowerCase()) {
                console.log('matched nameeeeeeeeeeeeeeeee', e.name)
                return true
            }
        });
        console.log("countrylist eeeeeeeeeee check kr e... aseni", obj, country)

        if (obj) {
            console.log('objjjjjjjjj', obj)
            this.setState({
                countryCode: obj.dialCode,
                isPhoneLoading: false
            })
        }
    }

    validate() {
        if (this.state.fieldDetail.find((e) => (!e.valid || e.isError))) {
            return false
        } else {
            return true
        }
    }





    countryCodeHandler() {
        this.setState({ PhoneNoCode: !this.state.PhoneNoCode })

    }

    
    phoneNoCodeSearch(e){
        this.setState({
            phoneNoCodeSearch: e.target.value
        })

    }

    componentWillReceiveProps(props) {
        this.setState({ signUpLoading: props.LoginReducer.signUpLoading });
      }


    render() {

        let inputSection = this.state.fieldDetail && this.state.fieldDetail.map((ele, i) =>
            <div>
                {(ele.key !== 'phoneNo') ?
                    <>
                        <div className='inputBlock'>
                            <div className='d-flex flex-row textInput text'>
                                <div>
                                    <i class={ele.icon}></i>
                                </div>
                                <MaterialInput
                                    className={ele.showable ? 'd-flex flex-grow-1 pl-3' : "textInput text pl-3"}
                                    type={ele.isSecured ? 'password' : ele.type}
                                    content={ele.placeHolder}
                                    onChange={(event) => this.handleOnChange(ele, i, event)}
                                />
                                {ele.showable &&
                                    <Button color='' onClick={() => this.toggleDisplay(i)}>
                                        <i class={ele.displayIcon ? ele.displayIcon : "fas fa-eye"}></i>
                                    </Button>}
                            </div>
                            {ele.matchError ?
                                <span className="position-absolute invalidEmail text pl-3 pr-3">{ele.matchError}</span>
                                :
                                ele.isError && <span className="position-absolute invalidEmail text pl-3 pr-3">{ele.regxMsg ? ele.regxMsg : 'Invalid input'}</span>}
                        </div>


                    </>
                    :
                    <>
                        <>

                            <div className='position-relative'>
                                <div className='inputBlock'>
                                    <div className='d-flex flex-row textInput text'>
                                        <span className='phoneNumberCode text '>
                                            <Button className='p-0' color='' onClick={() => this.countryCodeHandler()}>
                                                <i class={this.state.PhoneNoCode ? "fa fa-caret-up" : "fa fa-caret-down"}></i>
                                                <span className="textInput text ml-2">{this.state.countryCode ? this.state.countryCode : null}</span>
                                            </Button>
                                        </span>
                                        <MaterialInput
                                            className="textInput d-flex flex-grow-1 text ml-3"
                                            contentClass='pl-5 w-100'
                                            inputClass={'pl-5'}
                                            type={ele.type}
                                            content={ele.placeHolder}
                                            onChange={(event) => this.handleOnChange(ele, i, event)}
                                        />
                                    </div>
                                    {ele.isError && <span className="position-absolute invalidEmail text pl-3">{ele.regxMsg ? ele.regxMsg : 'Invalid input'}</span>}
                                </div>
                                {this.state.PhoneNoCode &&
                                    <div className='phoneCodeList'>
                                        <input placeholder='Search for country' className='phoneNoCodeSearch' onChange={(event) => this.phoneNoCodeSearch(event)} />
                                        {this.state.phoneNoCodeSearch ?
                                            <div className='phoneCodeListScroll'>
                                                {CountryList.length && CountryList && CountryList.filter(e => e.name.toLowerCase().includes(this.state.phoneNoCodeSearch)).map((ele, i) =>
                                                    <div key={i} >
                                                        <Button className='phoneCode' color='' onClick={() => this.setState({ countryCode: ele.dialCode, PhoneNoCode: false, phoneNoCodeSearch: null })}>
                                                            {ele.name}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div> :
                                            <div className='phoneCodeListScroll'>
                                                {CountryList.map((ele, i) =>
                                                    <div key={i} >
                                                        <Button className='phoneCode' color='' onClick={() => this.setState({ countryCode: ele.dialCode, PhoneNoCode: false })}>
                                                            {ele.name}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>}
                                    </div>
                                }


                            </div>


                        </>
                    </>
                }
            </div>)

        return (
            <div className='w-100 mb-3'>
                {this.state.fieldDetail && this.state.buttonDetail && <div>
                    <Container>
                        <div>
                            <div>
                                {inputSection}
                            </div>



                            <div className=" mt-5 pb-5">
                                <Button disabled={!this.validate()} style={{ borderRadius: this.state.buttonDetail.borderRadis, backgroundColor: this.state.buttonDetail.btnClr, borderWidth: 3, borderColor: 'white', width: '100%', height: '55px' }} onClick={() => this.onHandleSignUp()}
                                >{!this.state.signUpLoading ? <strong color={this.state.buttonDetail.btntxtClr}>{this.state.buttonDetail.btnTxt}</strong>
                                : <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                    </Button>
                            </div>
                        </div>

                        <div>
                            <GoogleLogin
                                clientId={Google_Client_Id}
                                render={renderProps => (
                                    <Button color='' className="mb-3" onClick={() => renderProps.onClick()}
                                        style={{ backgroundColor: '#dc4040', borderRadius: this.state.buttonDetail.borderRadis, alignItems: 'center', height: '50px', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', width: '100%' }}>
                                        <img src={require('../assets/google-logo.png')} className='buttonImage' />
                                        <span className="text buttonText textBold">Sign Up With Google</span>
                                    </Button>
                                )}
                                buttonText="Login"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <div sm="2" className='d-flex justify-content-center align-items-center'>
                            OR
                        </div>
                        <div>
                            <FacebookLogin
                                appId={Facebook_Id}
                                callback={this.responseFacebook}
                                render={renderProps => (
                                    <Button color='' className="mt-3" onClick={() => renderProps.onClick()}
                                        style={{ borderRadius: this.state.buttonDetail.borderRadis, backgroundColor: 'rgb(2, 2, 238)', alignItems: 'center', height: '50px', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                                        <img src={require('../assets/facebook-logo.png')}
                                            className='buttonImage' />
                                        <span className="text buttonText textBold">Sign Up With Facebook</span>
                                    </Button>
                                )}
                            />

                        </div>


                    </Container>


                </div>}
            </div>


        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(SignUp);