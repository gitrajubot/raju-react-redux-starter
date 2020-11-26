import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Input, } from 'reactstrap';


import Header from '../components/header';

import { connect } from 'react-redux';

import '../App.scss';
import './../scss/login.scss';
import '../Global.scss'
import { FormCheck } from 'react-bootstrap';

class TablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chkbox: true
        }
    }

    onKeyPress(event) {
        if (event.which === 13) {
            this.search();
        }
    }

    handleChange(e) {
        this.setState({ search: e.target.value });
    }

    addFilter = () => {

    }

    render() {

        return (
            <div>
                <div className='mb-5'>
                    <Header></Header>
                </div>
                <div className='p-5 w-100 position-fixed bgColor'>
                    <div className="d-flex justify-content-center " >
                        <div className="d-flex searchInput">
                            <Row sm='12' className="input">
                                <Col sm='9' className="inputCol">
                                    <Input className="inputPlace" placeholder="search" onChange={(e) => this.handleChange(e)} onKeyPress={(e) => this.onKeyPress(e)}></Input>
                                </Col>
                                <Col sm='3' className="inputCol">
                                    <Button color='' className="inputButton" onClick={() => this.addFilter()}>+ Add Filter</Button>
                                </Col>
                            </Row>
                        </div>

                    </div>
                </div>
                <div className='tableBody'>
                    <Table className="w-100 h-100 bgColor">
                        <thead>
                            <tr>
                                <th></th>
                                <th>CREID ID</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Postcard</th>
                                <th>Address</th>
                                <th>Type</th>
                                <th>Tenure</th>
                                <th>Beds</th>
                                <th>Baths</th>
                                <th>Receptions</th>
                                <th>Gardens</th>
                                <th>Internal</th>
                                <th>External</th>
                                <th>Year Built</th>
                                <th>Conditions</th>
                                <th>Last Sold</th>
                                <th>Sale Price</th>
                                <th>A.I price</th>
                                <th>Accuracy</th>
                                <th>Valuation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <input type="checkbox" defaultChecked={this.state.chkbox} onChange={() => this.handleChangeChk()} />
                                </th>

                                <td>120399345</td>
                                <td>U.K</td>
                                <td>London</td>
                                <td>SW7 2QE</td>
                                <td>Penthouse</td>
                                <td>Flat</td>
                                <td>L</td>
                                <td>3</td>
                                <td>4</td>
                                <td>2</td>
                                <td>N</td>
                                <td>1350</td>
                                <td>650</td>
                                <td>1960</td>
                                <td>****</td>
                                <td>May, 2013</td>
                                <td>$12,45,678</td>
                                <td>$34,56,678</td>
                                <td>83%</td>
                                <td>$34,56,678</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <input type="checkbox" defaultChecked={this.state.chkbox} onChange={() => this.handleChangeChk()} />
                                </th>

                                <td>120399345</td>
                                <td>U.K</td>
                                <td>London</td>
                                <td>SW7 2QE</td>
                                <td>Penthouse</td>
                                <td>Flat</td>
                                <td>L</td>
                                <td>3</td>
                                <td>4</td>
                                <td>2</td>
                                <td>N</td>
                                <td>1350</td>
                                <td>650</td>
                                <td>1960</td>
                                <td>****</td>
                                <td>May, 2013</td>
                                <td>$12,45,678</td>
                                <td>$34,56,678</td>
                                <td>83%</td>
                                <td>$34,56,678</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <input type="checkbox" defaultChecked={this.state.chkbox} onChange={() => this.handleChangeChk()} />
                                </th>

                                <td>120399345</td>
                                <td>U.K</td>
                                <td>London</td>
                                <td>SW7 2QE</td>
                                <td>Penthouse</td>
                                <td>Flat</td>
                                <td>L</td>
                                <td>3</td>
                                <td>4</td>
                                <td>2</td>
                                <td>N</td>
                                <td>1350</td>
                                <td>650</td>
                                <td>1960</td>
                                <td>****</td>
                                <td>May, 2013</td>
                                <td>$12,45,678</td>
                                <td>$34,56,678</td>
                                <td>83%</td>
                                <td>$34,56,678</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <input type="checkbox" defaultChecked={this.state.chkbox} onChange={() => this.handleChangeChk()} />
                                </th>

                                <td>120399345</td>
                                <td>U.K</td>
                                <td>London</td>
                                <td>SW7 2QE</td>
                                <td>Penthouse</td>
                                <td>Flat</td>
                                <td>L</td>
                                <td>3</td>
                                <td>4</td>
                                <td>2</td>
                                <td>N</td>
                                <td>1350</td>
                                <td>650</td>
                                <td>1960</td>
                                <td>****</td>
                                <td>May, 2013</td>
                                <td>$12,45,678</td>
                                <td>$34,56,678</td>
                                <td>83%</td>
                                <td>$34,56,678</td>
                            </tr>
                        </tbody>
                    </Table>

                </div>


            </div>

        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(TablePage);
