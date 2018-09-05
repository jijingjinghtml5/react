import React, { Component } from 'react';
import { Header,Footer } from '../../component/common';
import PageDesign from '../../component/pagedesign';
import { Tool } from '../../util';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from './action'


class Index extends Component{
	componentDidMount(){
		this.getData();
	}
	async getData(){
	    let res = await Tool.post('/m/xcxpage.html',{});
	    console.log(res);
	    this.props.setData(res);
        //store.dispatch(setWidget(res));
        console.log(this.props.visibleDATA);
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

// const mapDispatchToProps = (dispatch, ownProps) => {
    
//     return bindActionCreators({
//         set_widget: function(res){
//             console.log('dispatchdispatch');
//             console.log(dispatch);
//             dispatch(setData(res))
//         }
//     })
// }

//export default connect(mapDispatchToProps)(Index);
//export default connect()(Index);
export default connect((state) => { return { visibleDATA: state.visibleDATA }; }, action())(Index); //连接redux