import React,{Component} from 'react'
// import PropTypes from 'prop-types';
//import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {NavLink as Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();





// 如果使用createBrowserHistory
export class Header extends Component{
	constructor(props) {
	    super(props);
	    this.state = {date: new Date()};
	}
	goback(){
      	// 使用方式
		history.goBack();
  	}
	render(){
		let {title,leftTo,leftIcon,rightTo,rightIcon,rightClick} = this.props;
		let left = null;
		if (leftTo && leftIcon){
			left = (
				<Link to={leftTo}>
					<i className={'iconfont icon-'+leftIcon}></i>
				</Link>
			);
		}else if (leftIcon === 'fanhui') {
			left = (
				// <a onClick={this.context.router.history.goBack}>
				// 	<i className={'iconfont icon-'+leftIcon}></i>
				// </a>
				<a onClick={()=>this.goback()}>
					<i className={'iconfont icon-'+leftIcon}></i>
				</a>
			);
		}

		let right = null;
		if (rightTo && rightIcon) {
			right = (
				<Link to={leftTo}>
					<i className={'iconfont icon-'+rightIcon}></i>
				</Link>
			)
		}else if (rightClick && rightIcon){
			right = (
				<div onClick={rightClick}>
					<i className={'iconfont icon-' + rightIcon}></i>
				</div>
			)
		}
		return (
			<header className="app-header">
				<div className="icon">
					{left}
				</div>
				<h2 className="title">{title}</h2>
				<div className="icon">
					{right}
				</div>
			</header>
		)
	}
}
// Header.contextTypes = {
//       router: PropTypes.object.isRequired
// }
export  class Footer extends Component{
	render () {
		return (
			<ul className="app-footer">
				<li>
					<Link to='/pages/index/index'>
						首页
					</Link>
				</li>
				<li>
					<Link to='/pages/category/category'>
						分类
					</Link>
				</li>
				<li>
					<Link to='/pages/cart/cart'>
						购物车
					</Link>
				</li>
				<li>
					<Link to='/pages/member/index'>
						个人中心
					</Link>
				</li>
			</ul>
		)
	}
}