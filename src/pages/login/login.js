import React, { Component } from 'react';
import { Button,Toast } from 'antd-mobile';
import { Header,Footer } from '../../component/common';
import { Tool } from '../../util';
import PropTypes from 'prop-types';
import store from '../../Config/Store';
import './login.less'
// import Alert from '../../src/components/Alert';
export default class Login extends Component{
  constructor(){
    super();
    this.state = {
      username:'13585699136',
      password:'123456'
    };
  }
  componentDidMount(){
    const state = store.getState();
    const sta = store.dispatch({ type: 'ADD', payload: 0 })
    console.log('react');
    console.log(sta);
  }
  changeName(e){
    this.setState({
      username: e.target.value
    });
  }
  changePass(e){
    this.setState({
      password: e.target.value
    });
  }
  async submitLogin(){
    let { username,password } = this.state;
    let res = await Tool.post('/m/passport-post_login.html',{uname:username,password:password});
    if (res.success) {
        Toast.info('登陆成功');
        this.context.router.history.push('/pages/member/index')
    } else {
        Toast.info('登陆失败');
    }
  }
	render() {
    return (
      <div className="Login">
      	<Header title="登录"/>
        <div>
            <label>用户名：</label>
            <input type="text" value={this.state.username} placeholder="请输入用户名" onChange={(e)=>this.changeName(e)}/>
        </div>
        <div>
            <label>密码：</label>
            <input type="password" placeholder="请输入密码" value={this.state.password} onChange={(e)=>this.changePass(e)}/>
        </div>
        <button onClick={this.submitLogin.bind(this)}>登录</button>
      </div>
    );
  }
}
Login.contextTypes = {
      router: PropTypes.object.isRequired
}