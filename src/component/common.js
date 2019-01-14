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
					<i className={'iconfont icon-'+leftIcon}>back</i>
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
	constructor(props){
		super(props);
	}
	render () {
		let current = this.props.type;
		return (
			<ul className="app-footer">
				<li>
					<Link to='/pages/index/index'>
						{current=='index'?(
                            <img src={require('../Statics/home_fill.png')} />
						):(
                            <img src={require('../Statics/home.png')} />
						)}
						<label className={current=='index'?'active':''}>首页</label>
					</Link>
				</li>
				<li>
					<Link to='/pages/brand/brand'>
                        {current=='brand'?(
                            <img src={require('../Statics/brand_fill.png')} />
                        ):(
                            <img src={require('../Statics/brand.png')} />
                        )}
						<label className={current=='brand'?'active':''}>品牌</label>
					</Link>
				</li>
				<li>
					<Link to='/pages/cart/cart'>
                        {current=='cart'?(
                            <img src={require('../Statics/cart_fill.png')} />
                        ):(
                            <img src={require('../Statics/cart.png')} />
                        )}
						<label className={current=='cart'?'active':''}>购物车</label>
					</Link>
				</li>
				<li>
					<Link to='/pages/member/index'>
                        {current=='member'?(
                            <img src={require('../Statics/my_fill.png')} />
                        ):(
                            <img src={require('../Statics/my.png')} />
                        )}
						<label className={current=='member'?'active':''}>个人中心</label>
					</Link>
				</li>
			</ul>
		)
	}
}