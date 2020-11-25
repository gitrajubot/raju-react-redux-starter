import React, { Component } from 'react';
import { Navbar, NavbarBrand, Row, Col, Button } from 'reactstrap';
import '../App.scss';
import { LogoutAction } from './../actions/LogoutAction';
import { connect } from 'react-redux';

const user = require("./../assets/useImage.png");
const logo = require("./../assets/logo.png");
class Header extends Component {
    constructor(props) {
        super(props);
        console.log('header constructor', props)
        this.state = {
            isMenuOpen: false,
            UserId: localStorage.getItem('UserId'),
            // brandDetail: props.GetConfigurationReducer.configData.appConfig.brandSection
        };
    }


    menuHandle() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    logOut() {
        let data = {
            _id: this.state.UserId
        }
        this.props.dispatch(LogoutAction(data, (response) => {
            console.log('logout', response)
            if (response.loginType === 'Facebook' || response.loginType === 'Google') {
                if (response.loginType === 'Facebook') {
                    //   LoginManager.logOut();
                    this.clearStorage()
                }
                else {
                    this.clearStorage()
                }
            }
            else {
                this.clearStorage()
            }
        }))
    }
    clearStorage() {
        localStorage.clear();
        this.props.history.push(`/loginSignupPage`)
    }


    render() {
        return (

            <Navbar color="primary" fixed='top' style={{ height: '80px', boxShadow: 'none', display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                        <div className='companyIconDesign'><img style={{ height: '30px', width: '30px' }} src={logo} /></div>
                        <div className='mt-3'>
                            <div className='logoText textBold'>{this.props.brandName.name} </div>
                            {this.props.brandName.isTag &&
                                <div className='tag'>{this.props.brandName.tagLine}</div>
                            }
                        </div>
                    </div>
                    <div>
                        {this.props.profImg ? <Button style={{ borderRadius: '100%', height: '25px', width: '25px', border: 'unset', backgroundColor: 'unset', alignItems: 'center', justifyContent: 'center', margin:'15px' }} onClick={() => this.menuHandle()}>
                            <img style={{ borderRadius: '100%', height: '25px', width: '25px', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} src={(localStorage.getItem('profImg')!=='null') ? localStorage.getItem('profImg') : user} />
                            {
                                this.state.isMenuOpen ?
                                    <div>
                                        <ul className='dropdownDesign'>
                                            <li className='fullWidth'><Button className="transparentButton listOptionDesign fullWidth" onClick={() => this.props.history.push(`/dashboard`)}>Dashboard</Button></li>
                                            <li className='fullWidth'><Button className="transparentButton listOptionDesign fullWidth" onClick={() => this.props.history.push(`/editProfile`)}>Edit Profile</Button></li>
                                            {localStorage.getItem('socialID') ? console.log('') :
                                                <li className='fullWidth'><Button className="transparentButton listOptionDesign fullWidth" onClick={() => this.props.history.push(`/ResetPassword`)}>Change Password</Button></li>}
                                            <li className='fullWidth'><Button className="transparentButton listOptionDesign fullWidth" onClick={() => this.logOut()}>Logout</Button></li>
                                        </ul>
                                    </div>
                                    :
                                    null
                            }
                        </Button> : null}
                    </div>
                </div>
            </Navbar>

        );

    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Header);

