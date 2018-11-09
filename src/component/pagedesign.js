import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import action from './action';
import GoodsList from './widgets/goodslist'
import SearchBar from './widgets/search'
class PageDesign extends Component{
	render() {
		console.log(this.props.visibleDATA);
		let widgets = this.props.visibleDATA.widgets;
		if(!widgets) return null;
		console.log(widgets);
    	return (
    		<ul className="PageDesign">
		    	{

					// <GoodsList></GoodsList>
					widgets.map(function(item,index){
						if(item.name=='goodslist'){
							return <GoodsList key={index}></GoodsList>
						}
						
					})
		    	}
	      	</ul>
      	)
	}
}
export default connect((state) => { return { visibleDATA: state.visibleDATA }; })(PageDesign);