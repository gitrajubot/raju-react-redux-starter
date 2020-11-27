import React, {Component} from 'react';
import './App.scss';
// import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import  Router  from './router'
import { connect } from 'react-redux';
import {GetConfigurationAction} from './actions/GetConfigurationAction';



class App extends Component {
  constructor(props){
    console.log('app consssssssssssssss', Router.prototype.state)
    super(props);
    this.ready = false;
    this.router = new Router();
    this.state={
        // Routes: []
    }
    this.getConfigArr();
}

getConfigArr(){
  this.props.dispatch(GetConfigurationAction((res) => {
    console.log('config response',res)
    if(res){
      this.ready = true;
    }
  }))
}

  render(){
    {console.log('in renderrrrrrrrrrrrrrrrr')}
    return (
      
      <div className="App" >
      
        {/* <ToastContainer position="top-right" autoClose={4000} style={{zIndex: 999999}} /> */}
       
        <BrowserRouter>
          <div>
          <Switch>
              {this.router.routes.map(route => 
                route.redirectTo? 
                <Redirect key={route.path} to={route.redirectTo} /> : 
                <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
                )
              }
            </Switch>
          </div>
        </BrowserRouter> 
      </div>  
      
    );
  }
  
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);
