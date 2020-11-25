import React, { Component } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';

import MaterialInput from './../components/materialInput'
import { Google_Client_Id, Facebook_Id } from '../constant';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import { SocialLoginAction } from './../actions/SocialLoginAction';
import { loginAction } from './../actions/LoginAction';
import { connect } from 'react-redux';


import '../App.scss';
import './../scss/login.scss';

import Router from './../router';



class Login extends Component {
  constructor(props) {
    super(props);
    console.log('sign up constructor', props)
    this.router = new Router();
    this.state = {
      tempDisplay: true,
      displayIcon: "fas fa-eye",
      otp_validation: props.GetConfigurationReducer.configData.appConfig.otpValidation,
      urlValidation: props.GetConfigurationReducer.configData.urlValidation,
      fieldDetail: props.GetConfigurationReducer.configData.appConfig.inputSection,
      buttonDetail: props.GetConfigurationReducer.configData.appConfig.buttonSection,
      brandDetail: props.GetConfigurationReducer.configData.appConfig.brandSection,
    };
  }

  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
  }


  responseGoogle = (response) => {
    // console.log('Google', response);
    if (response.tokenId) {
      this.setState({
        tokenid: response.tokenId,
      })
      this.afterLogin(response.tokenId, 'Google')
    }
  }


  responseFacebook = (response) => {
    // console.log('facebook', response);
    if (response.accessToken) {
      this.setState({
        accessToken: response.accessToken,
        facebookId: response.id,
      })
      this.afterLogin(response.accessToken, 'Facebook')
    }
  }


  afterLogin(data, type) {
    data = {
      providers: type,
      accessToken: data,
    }
    this.props.dispatch(SocialLoginAction(data, (response) => {
      // console.log("social log in response", response);
      if (response.user._id) {
        localStorage.setItem('JWT', response.user.token);
        this.setState({
          UserId: response.user._id
        }, () => {
          if (this.state.fieldDetail.find((e) => (e.key === 'phoneNo'))) {
            if (!response.user.phoneNo) {
              this.props.history.push({ pathname: '/addPhoneNo', state: { userId: response.user._id } })
            }
            else {
              if(this.state.otp_validation){
                if(response.user.isValidate){
                  localStorage.setItem('UserId', response.user._id)
                  this.props.history.push(`/dashboard`)
                }else{
                  this.props.history.push({pathname: '/otpVerification', state: {userId: response.user._id, code: response.user.phoneNo.code, number: response.user.phoneNo.number}})
                }
              }
             
            }
          }
          else {
            localStorage.setItem('UserId', response.user._id)
            this.props.history.push(`/dashboard`)
          }
        })

      }
    }))
  }

  componentDidMount() {
    const ifMail = this.state.fieldDetail.find((e) => e.key === 'email')
    const ifPass = this.state.fieldDetail.find((e) => e.key === 'password')
    if (ifMail) {
      this.setState({
        emailPattern: ifMail.regex && ifMail.regex,
        mailMissmatch: ifMail.regxMsg && ifMail.regxMsg
      })
    }
    if (ifPass) {
      this.setState({
        passwordPattern: ifPass.regex && ifPass.regex,
        passMismatch: ifPass.regxMsg && ifPass.regxMsg
      })
    }
  }


  checkPattern(type, event) {
    var mailpattern = this.state.emailPattern ? new RegExp(this.state.emailPattern) : null
    var passpattern = this.state.passwordPattern ? new RegExp(this.state.passwordPattern) : null
    if (type === 'mail') {
      if (mailpattern && !mailpattern.test(event.target.value)) {
        this.state.invalid = event.target.value ? true : false
      }
      else {
        this.state.invalid = false
      }
    } else {
      if (passpattern && !passpattern.test(event.target.value)) {
        this.state.passinvalid = event.target.value ? true : false
      }
      else {
        this.state.passinvalid = false
      }
    }
  }


  handleOnChange(type, event) {
    if (type === 'mail') {
      this.checkPattern(type, event)
      this.setState({ email: event.target.value })
    }
    else {
      this.checkPattern(type, event)
      this.setState({ password: event.target.value })
    }
  }

  toggleDisplay() {
    this.setState({ tempDisplay: !this.state.tempDisplay })
    if (!this.state.tempDisplay) {
      this.setState({
        displayIcon: "fas fa-eye"
      })
    }
    else {
      this.setState({
        displayIcon: "fas fa-eye-slash"
      })
    }
  }

  onHandleLogin() {
    if (this.state.email && this.state.password) {
      const data = {
        email: this.state && this.state.email,
        password: this.state && this.state.password
      };
 
      this.props.dispatch(loginAction(data, (response) => {
        // console.log("log in console", response)
        if (response.success) {
          localStorage.setItem('JWT', response.user.token);
          if(this.state.otp_validation){
            if(response.user.isValidate){
              localStorage.setItem('UserId', response.user._id);
              this.props.history.push(`/dashboard`);
            }else{
              if(response.user.phoneNo){
                this.props.history.push({pathname: '/otpVerification', state: {userId: response.user._id, code: response.user.phoneNo.code, number: response.user.phoneNo.number}})
              }
              else if(this.state.urlValidation){
                  alert('Verification link send to your E-mail')
              }
              else{
                this.props.history.push({pathname: '/otpVerification', state: {userId: response.user._id, iseMailOtp: true, mail: response.user.email}})
              }

            }
          }else{
            localStorage.setItem('UserId', response.user._id);
            this.props.history.push(`/dashboard`);
          }
          
        } else {
          alert("wrong login credential")
        }
      }
      ));
    }
  };

  componentWillReceiveProps(props) {
    this.setState({ loginLoading: props.LoginReducer.loginLoading });
  }

  forgetPassword(){
    this.props.history.push(`/forgetPassword`)
  }

  render() {
    return (
      <div className="w-100">
        {this.props.GetConfigurationReducer.configData.appConfig &&
          <div className='pt-3 pb-4'>
            <Container>
              <div>
                <div className='inputBlock'>
                  <MaterialInput
                    className="textInput text pl-3"
                    type={'text'}
                    content={'Email'}
                    onChange={(event) => this.handleOnChange('mail', event)}
                  />
                  {this.state.invalid && <span className="position-absolute invalidEmail text pl-3">{this.state.mailMissmatch ? this.state.mailMissmatch : 'invalid input'}</span>}

                </div>

                <div className='inputBlock'>
                  <div className='d-flex flex-row textInput text'>
                    <MaterialInput
                      className='d-flex flex-grow-1 pl-3'
                      type={!this.state.tempDisplay ? "text" : "password"}
                      content={'Password'}
                      onChange={(event) => this.handleOnChange('pass', event)}
                    />
                    <Button color='' onClick={() => this.toggleDisplay()}>
                      <i class={this.state.displayIcon}></i>
                    </Button>
                  </div>
                  {/* {this.state.passinvalid && <span className="position-absolute invalidEmail text ml-3">{this.state.passMismatch ? this.state.passMismatch : 'invalid input'}</span>} */}
                </div>

              </div>


              <div className="Next mb-5 mr-2 mt-2">
                <div className="float-right"><a className="text"  href="javascript:void(0);" onClick={() => this.forgetPassword()}>Forgot Password ?</a> </div>
              </div>
              <div className="Next mt-5">
                <Button disabled={!(this.state.email && this.state.password && !this.state.invalid)} className='mt-2'
                  style={{ borderRadius: this.state.buttonDetail.borderRadis, backgroundColor: this.state.buttonDetail.btnClr, borderWidth: 3, borderColor: 'white', width: '100%', height: '55px' }} onClick={() => this.onHandleLogin()}>
                  {!this.state.loginLoading ? <strong color={this.state.buttonDetail.btntxtClr}>Login</strong>
                    : <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                </Button>
              </div>

              <div className='mt-5'>
                <div>
                  <GoogleLogin
                    clientId={Google_Client_Id}
                    render={renderProps => (
                      <Button color='' className="mb-3" onClick={() => renderProps.onClick()}
                        style={{ backgroundColor: '#dc4040', borderRadius: this.state.buttonDetail.borderRadis, alignItems: 'center', height: '50px', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', width: '100%' }}>
                        <img src={require('../assets/google-logo.png')} className='buttonImage' />
                        <span className="text buttonText textBold">Login With Google</span>
                      </Button>
                    )}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
                <div className='d-flex justify-content-center align-items-center'>
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
                        <span className="text buttonText textBold">Login With Facebook</span>
                      </Button>
                    )}
                  />
                </div>

              </div>


            </Container>

          </div>
        }
      </div>
    );
  }

}


const mapStateToProps = state => state;
export default connect(mapStateToProps)(Login);