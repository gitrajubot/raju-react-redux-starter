import React, { Component } from 'react';
import './App.scss';
// import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Router from './router'
import { connect } from 'react-redux';
import { GetHeaderDataAction } from './actions/TablePageAction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import MaterialInput from './components/materialInput'



class App extends Component {
  constructor(props) {
    console.log('app consssssssssssssss', Router.prototype.state)
    super(props);
    this.ready = false;
    this.router = new Router();
    this.state = {
      // Routes: []
      modal: true
    }
    this.getConfigArr();
  }

  getConfigArr() {
    this.props.dispatch(GetHeaderDataAction((res) => {
      console.log('config response', res)
      if (res) {
        this.ready = true;
      }
    }))
  }

  setModal() {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    { console.log('in renderrrrrrrrrrrrrrrrr') }
    return (
      this.ready ?
        <div className="App" >

          {/* <ToastContainer position="top-right" autoClose={4000} style={{zIndex: 999999}} /> */}

          <BrowserRouter>
            <div>
              <Switch>
                {this.router.routes.map(route =>
                  route.redirectTo ?
                    <Redirect key={route.path} to={route.redirectTo} /> :
                    <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
                )
                }
              </Switch>
            </div>
          </BrowserRouter>
        </div>
        :
        <>
          {/* <div> */}
          {/* <Button color="danger" onClick={() => this.setModal}>{buttonLabel}</Button> */}
          <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
            toggle={() => this.setModal} className='modalContainer'>
            {/* <ModalHeader toggle={() => this.setModal}>Edit filter</ModalHeader> */}
            <div className='modalTitle'>Edit filter</div>
            <ModalBody>
              <div className="modalTitle  fieldTitle">Column</div>
              <Dropdown as={ButtonGroup} className='addFilterDropdown'>
                <Button variant="success" className='selectedOption'>Select</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className='dropdownArrow' />

                <Dropdown.Menu className='options'>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="modalTitle  fieldTitle">State</div>
              <MaterialInput inputClass="modalInp"></MaterialInput>
              <div className="modalTitle  fieldTitle">Value</div>
              <MaterialInput inputClass="modalInp"></MaterialInput>
            </ModalBody>
            <div className='modalBtnContainer'>
              <Button color="primary" className='cancelBtn' onClick={() => this.setModal}>Cancel</Button>{' '}
              <Button color="secondary" className='addBtn' onClick={() => this.setModal}>Add</Button>
            </div>
          </Modal>
          {/* </div> */}
        </>
    );
  }

}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);
