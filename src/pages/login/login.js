import React, { Component } from 'react';
import { Button,Toast } from 'antd-mobile';
import { Header,Footer } from '../../component/common';
import { Tool } from '../../util';
import PropTypes from 'prop-types';
import store from '../../Config/Store';
import * as config from '../../Config/Config';
import './login.less'


const {target} = config;
const timer = function () {
    var _this = this;
    if (_this.vcode_percent_timer) {
        clearInterval(_this.vcode_percent_timer)
    }
    _this.vcode_percent_timer = setInterval(function () {
        if (_this.state.vcode_percent <= 0) {
            _this.setState({
                vcode_percent: 0
            });
            return clearInterval(_this.vcode_percent_timer);
        }
        _this.setState({
            vcode_percent: _this.state.vcode_percent - 1
        });
    }, 1000);
}
// import Alert from '../../src/components/Alert';
export default class Login extends Component{
  constructor(){
        super();
        this.state = {
              username:'13585699136',
              password:'',
              target:target
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
  //获取验证码
  async getCode(e){
      let { username,password } = this.state;
      if(username=='') return;
      let res = await Tool.post('/m/passport-member_vcode.html',{account: username});
      if (res.success) {
          this.setState({
              vcode_percent:60
          })
          timer.call(this);
      }else {
          Toast.info('获取失败');
      }
  }
  async submitLogin(){
    let { username,password } = this.state;
    let res = await Tool.post('/m/passport-post_login.html',{uname:username,vcode:password});
    if (res.success) {
        Toast.info('登录成功');
        this.context.router.history.push('/pages/member/index')
    } else {
        Toast.info('登录失败');
    }
  }
	render() {
    return (
      <div className="Login">
      	<Header title="登录"/>
            <img className={'logo'} src={`${this.state.target}/public/wechat/login/jxklogo.png`}></img>
            <div>
                <input type="text" value={this.state.username} placeholder="请输入用户名" onChange={(e)=>this.changeName(e)}/>
            </div>
            <div>
                <input type="password" placeholder="请输入验证码" value={this.state.password} onChange={(e)=>this.changePass(e)}/>
                {this.state.vcode_percent?(
                    <label className="gray_code">{this.state.vcode_percent}s</label>
                ):(
                    <label onClick={(e)=>this.getCode(e)}>获取验证码</label>
                )}

            </div>
            <button onClick={this.submitLogin.bind(this)}>登录</button>
      </div>
    );
  }
}
Login.contextTypes = {
      router: PropTypes.object.isRequired
}