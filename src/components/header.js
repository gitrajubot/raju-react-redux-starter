import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse,
} from 'reactstrap';
import { BrowserRouter } from "react-router-dom"
import '../App.scss';
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        console.log('header constructor', props)
        this.state = {
            isOpen: false,
        };
    }







    render() {
        const toggle = () => this.setState({ isOpen: !this.state.isOpen });
        return (
            <Navbar expand="md" fixed='top'>
                <NavbarBrand href="/home">
                    <div className='logo'>
                        {/* <img src={require('../assets/homeScreen/logo.png')} /> */}
                        <div className='logoText textBold m-0'>Central Real Estate Intelligence Database.</div>
                    </div>
                </NavbarBrand>
                <BrowserRouter>
                    <NavbarToggler className="noBorder" onClick={toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar style={{color:"white"}}>
                            <NavItem >
                                <NavLink className='navlinkBox mr-3'><span className='navitemText textBold'>Proprties:</span> 
                                <span className='navitemNo'>30,200,750</span></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='navlinkBox mr-3' href="/"><span className='navitemText textBold'>Data:</span><span className='navitemNo'>30,200,750</span></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='navlinkBox mr-3' href="/"><span className='navitemText textBold'>Accuracy:</span> <span className='navitemNo'>30,200,750</span></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  className='navlinkBox mr-3' href="/"><span className='navitemText textBold'>Value:</span><span className='navitemNo'>30,200,750</span></NavLink>
                            </NavItem>
                        </Nav>

                    </Collapse>
                </BrowserRouter>
            </Navbar>

        );

    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Header);

