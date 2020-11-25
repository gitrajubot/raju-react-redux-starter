import React, { Component } from 'react';
import '../App.scss'

export default class ToggleButton extends Component {

    constructor(props){
        super(props);
        this.state={
            active: this.props.value
        }
        
    }
  render() {
    return (
        <div>
        {this.state.active ? <img onClick={() => this.setState({active:!this.state.active},()=>{
            this.props.onChange && this.props.onChange(this.state.active)
          })} src={require('../assets/icons8-toggle-on-30.png')}/> :<img onClick={() => this.setState({active:!this.state.active},()=>{
            this.props.onChange && this.props.onChange(this.state.active)})} src={require('../assets/icons8-toggle-off-30.png')}/>}
    </div>
    );
  }
}
