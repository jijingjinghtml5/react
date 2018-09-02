import React, { Component } from 'react';
import { Header,Footer } from '../../component/common';
import PageDesign from '../../component/pagedesign';
import { Tool } from '../../util';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWidget,setDATA } from './action'


class Index extends Component{
	componentDidMount(){
		this.getData();
	}
	async getData(){
	    let res = await Tool.post('/m/xcxpage.html',{});
	    console.log(res);
	    this.set_widget(res);
    }
	render() {
    return (
    	<div className="Index">
        	<Header title="首页"/>
        	<PageDesign/>
        	<Footer/>
      	</div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return bindActionCreators({
        set_widget: (res) => dispatch(setWidget(res))
    })
}

export default connect(mapDispatchToProps)(Index);