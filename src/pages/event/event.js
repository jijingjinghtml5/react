import React,{Component} from 'react'
import { Button,Toast,Modal } from 'antd-mobile';
import {NavLink as Link } from 'react-router-dom';
import { Header,Footer } from '../../component/common';
import PropTypes from 'prop-types';
import { Tool,Util } from '../../util';
import * as config from '../../Config/Config';
// import './activity.less';

class Activity extends Component {
    constructor(){
        super();
    }
    componentWillMount(){
        console.log(config);
        this.setState({
            img_url:config,
            images:{}
        })
    }
    componentDidMount() {
        let _this = this;
        let search = this.props.location.search ;
        search = search.slice(1,);
        let arr = search.split('&');
        arr.forEach(function(item,key) {
            let single = item.split('=');
            if(single[0] == 'activity_id'){
                _this.setState({
                    activity_id:single[1]
                })
                _this.onLoad(single[1]);
            }
        });
    }
    async onLoad(id){
        let res = await Tool.post('/m/activity-item-'+id+'.html',{});
        console.log(res);
        this.setState(res);
    }
    //加载图片
    loadImage(image_id){
        Util.loadImage(this,image_id, 'm');
        window.dispatchEvent(new Event('resize'));
        this.setState({ imgHeight: 'auto' });
    }
    render(){
        console.log(this.state);
        if(!this.state.activity) return null;
        let images = this.state.images;
        if(!images){
            images = [];
        }
        return (
            <div>
                {/*活动专场头部*/}
                <div className={"brand-top"}  style={{backgroundImage:'url('+this.state.img_url+'/public/wechat/active/brand_bg.png)'}}>
                    <img src={images[this.state.activity.merchant.logo_image]?images[this.state.activity.merchant.logo_image]:'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='} onLoad={this.loadImage.bind(this,this.state.activity.merchant.logo_image)}/>
                    <div className="brand-title">{this.state.activity.merchant.show_name}</div>
                    {/*<div className="brand-desc">{this.state.activity.goods_count ? this.state.activity.goods_count : 0}款商品<label*/}
                        {/*wx:if="{{activity.mtag}}">{this.state.activity.mtag}</label></div>*/}
                </div>
            </div>
        )
    }
}
export default Activity;