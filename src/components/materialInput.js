import React, { Component } from 'react';
import '../App.scss'
import './../scss/materialInput.scss';
import {Input} from 'reactstrap'
export default class MaterialInput extends Component {

    constructor(props){
        super(props);
        this.state ={
            className:'',
            type:'',
            content:'',
            contentClass:'',
            inputClass:'',
        }
    }
    render() {
        return (
            <div className={this.props.className}>
                <Input {...this.props} name='name' className={`inp matInp ${this.props.inputClass}`} required />
                <label for='name' className={`label-name ${this.props.contentClass}`}>
                    <span className='content-name'>{this.props.content}</span>
                </label>
            </div>
        );
    }
}
