import React, { Component } from 'react';
import { Navbar, NavbarBrand, Row, Col, Button } from 'reactstrap';
import '../App.scss';
import { connect } from 'react-redux';

// const user = require("./../assets/useImage.png");
// const logo = require("./../assets/logo.png");
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
        
                this.clearStorage()
            
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
                        <div className='companyIconDesign'>
                            {/* <img style={{ height: '30px', width: '30px' }} src={logo} /></div> */}
                        <div className='mt-3'>
                            <div className='logoText textBold'>{this.props.brandName.name} </div>
                            {this.props.brandName.isTag &&
                                <div className='tag'>{this.props.brandName.tagLine}</div>
                            }
                        </div>
                    </div>
                    </div>
                </div>
            </Navbar>

        );

    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Header);

