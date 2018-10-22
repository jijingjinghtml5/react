import React,{Component} from 'react'
import { Button,Toast } from 'bee-mobile';
import {NavLink as Link } from 'react-router-dom';
import { Header,Footer } from '../../component/common';
import { Tool,Util } from '../../util';
import { connect } from 'react-redux';
import './category.less';


class CateContent extends Component{
	constructor(props){
		super(props);

	}

	render(){
	    console.log(this.props);
	    let _this = this;
	    let images = _this.props.images;
	    if(!images){
	    	images = {};
		}
		return (
			<div className="CateContent">
	        	<ul className="CateLeft">
					{
				        this.props.first_cat.map((item,index)=>{
				            return (
				                <li  className={index==this.props.current_index?'active':''} key={item.cat_id} index={index} onClick={this.props.change.bind(this,index)}>{item.cat_name}</li>
				            )
				        })
				    }
		      	</ul>
				<ul className="CateRight">
		        	{
				        this.props.second_cat.map(function (item) {
				            return (
				                <li key={item.cat_id}>
					                <Link to={`/pages/gallery/gallery?cat_id=${item.cat_id}`}>
										<img src={images[item.addon.icon]?images[item.addon.icon]:'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='} onLoad={_this.props.loadImage.bind(_this,item.addon.icon)}/>
					                	<label>{item.cat_name}</label>
					                </Link>
				                </li>
				            )
				        })
				    }
		      	</ul>
	      	</div>
		)
	}
}
class Category extends Component{
	constructor(){
		super();
	    this.state = {
	      	current_cat:'',
	      	current_index:0,
	      	first_cat:[],
	      	second_cat:[]
	    }
	}
	componentDidMount(){
		this.getCate();
		console.log(this.props.visibleDATA);
	}
	change(index){
		this.setState({
			second_cat:this.state.first_cat[index].children?this.state.first_cat[index].children:[],
			current_index:index
		})
	}
    loadImage(image_id){
        console.log('image_id'+image_id);
        Util.loadImage(this,image_id, 'm');
        console.log(this.state);
    }
	async getCate(){
	    let res = await Tool.post('/m/category.html',{});
	    console.log(res);
	    if (res.category_tree) {
	        this.setState({
	        	first_cat:res.category_tree,
	        	second_cat:res.category_tree[0].children
	        }) 
	        console.log(this.state.first_cat);
	    } else {
	        Toast.show({
	            message: '暂无分类'
	        });
	    }
    }
	render(){
		return (
			<div className="Category">
	        	<Header title="分类"/>
	        	<CateContent first_cat={this.state.first_cat} current_index={this.state.current_index} change={this.change.bind(this)} second_cat={this.state.second_cat} images={this.state.images} loadImage={this.loadImage.bind(this)}/>
	        	<Footer/>
	      	</div>
		)
	}
}
export default connect((state) => { return { visibleDATA: state.visibleDATA }; })(Category); 