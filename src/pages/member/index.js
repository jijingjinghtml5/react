import React, { Component } from 'react';
import {NavLink as Link } from 'react-router-dom';
import { Header,Footer } from '../../component/common';
import PropTypes from 'prop-types';
import { Tool } from '../../util';
export default class MemberIndex extends Component{
	constructor(){
	    super();
	    this.state = {
	      member:false
	    };
	}
	componentDidMount(){
		//this.check_login();
		this.onLoad();
	}
	async check_login(){
		let res = await Tool.post('/m/passport-check_login.html',{});
	     if (res&&res.success) {
	    	this.onLoad();
	     } else {
	         this.context.router.history.push('/pages/login/login')
	     }
	}
	async onLoad(){
		let res = await Tool.post('/m/my.html',{});
	    	if(res&&res.member){
	    		this.setState({
		        	member:res.member
		        });
		        console.log(res.member.name);
	    	}else{
	    		this.context.router.history.push('/pages/login/login')
	    	}
	        
	}
	render() {
	    return (
			<div className="MemberIndex">
	      		<Header title="个人中心"/>
	      		{this.state.member.name}
	      		<Link to="/pages/member/signout/index">设置</Link>
	      		<Footer/>
	        </div>
	    );
	}
}

MemberIndex.contextTypes = {
      router: PropTypes.object.isRequired
}