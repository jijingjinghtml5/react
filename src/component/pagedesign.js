import React, { Component } from 'react'; 
import GoodsList from './widgets/goodslist'
import SearchBar from './widgets/search'
export default class PageDesign extends Component{
	render() {
	    return (
	    	<div className="PageDesign">
	        	<GoodsList/>
	        	<SearchBar/>
	      	</div>
	    );
	}
}