import React, { Component } from 'react';
import { Container, Row, Col, Button, Input, Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap';


import Header from '../components/header';
// import Login from './login'
// import SignUp from './signUp'

import { connect } from 'react-redux';

import '../App.scss';
import './../scss/login.scss';
import '../Global.scss'

class LoginSignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldDetail: props.GetConfigurationReducer.configData.appConfig.inputSection,
            buttonDetail: props.GetConfigurationReducer.configData.appConfig.buttonSection,
            brandDetail: props.GetConfigurationReducer.configData.appConfig.brandSection,
            tempDisplay: true,
            isNext: false,
            active: true,
        }
    }


    render() {
       
        return (
            <div className="w-100 h-100">
                <div className='mb-5 header'>
                    <Header brandName={this.state.brandDetail}></Header>
                </div>
                <Row className="m-0 p-0">
                    <Col lg="6" className="m-0 p-0 sidePart">
                        <div className=" loginPageImage d-flex justify-content-center">
                            <div className="sideImageText">
                                <Container className="noBorder">
                                    <Row sm='12' className="d-flex justify-content-center" >
                                        <div className="title textBold text-left">
                                            {this.state.brandDetail.name}
                                        </div>
                                    </Row>
                                    <Row sm='12' className="d-flex justify-content-center">
                                        <p className="subtitle text pr-3 text-left mt-3">
                                            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                                            The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                                        </p>
                                    </Row>
                                </Container>
                            </div>



                        </div>
                    </Col>
                    <Col lg="6" className='loginScroll mt-5' >

                        <div className='d-flex ml-4 tabButton'>
                            <div onClick={() => this.setState({ active: true })}
                                className={`flex-grow-1 text-left text tabButtonFont mr-3 ${this.state.active ? 'textBold activeTab ' : 'text inActiveTab'}`}>Login</div>

                            <div onClick={() => this.setState({ active: false })}
                                className={`flex-grow-1 text-left text tabButtonFont ${!this.state.active ? 'textBold activeTab ' : 'text inActiveTab'}`}>Signup</div>
                        </div>

                        {/* {this.state.active ? <Login history={this.props.history}/> : <SignUp history={this.props.history}/>} */}

                    </Col>
                </Row>

            </div>

        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(LoginSignupPage);
