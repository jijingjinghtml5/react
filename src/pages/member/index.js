import React, { Component } from 'react';
import {NavLink as Link } from 'react-router-dom';
import { Header,Footer } from '../../component/common';
import PropTypes from 'prop-types';
import {Tool, Util} from '../../util';
import './index.less';
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
	//加载图片
    loadImage(image_id){
        console.log('image_id'+image_id);
        Util.loadImage(this,image_id, 'm');
        console.log(this.state);
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
		let images = {};
		if(this.state.images){
            images = this.state.images;
		}
		if(!this.state.member) return null;
	    return (
			<div className="MemberIndex">
	      		<Header title="个人中心"/>
				<div className="memberTop">
                    <div className="topDetail">
                        <img src={images[this.state.member.avatar]?images[this.state.member.avatar]:'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='} onLoad={this.loadImage.bind(this,this.state.member.avatar)}/>
                        <label>{this.state.member.name}</label>
                        <label>{this.state.member.uname}</label>
                    </div>

                    <Link className="setting" to="/pages/member/signout/index">设置</Link>
				</div>
                <Footer/>
	        </div>
	    );
	}
}

MemberIndex.contextTypes = {
      router: PropTypes.object.isRequired
}