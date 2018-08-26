import React, { Component } from 'react';
import { Header,Footer } from '../../../component/common';
export default class MemberSignout extends Component{
	render() {
    return (
		<div className="MemberSignout">
      		<Header title="退出" leftIcon="fanhui"/>
      		<Footer/>
        </div>
    );
  }
}
