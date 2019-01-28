import React,{Component} from 'react'
import { Button,Toast,Modal } from 'antd-mobile';
import {NavLink as Link } from 'react-router-dom';
import { Header,Footer } from '../../component/common';
import { SingleGood } from '../../component/tpl';
import PropTypes from 'prop-types';
import { Tool,Util } from '../../util';
import * as config from '../../Config/Config';
import './event.less';

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
        this.setState({...res,current_time: Date.parse(new Date())});
    }
    //加载图片
    loadImage(image_id){
        Util.loadImage(this,image_id, 'm');
        window.dispatchEvent(new Event('resize'));
        this.setState({ imgHeight: 'auto' });
    }
    render(){
        if(!this.state.activity) return null;
        let images = this.state.images;
        if(!images){
            images = [];
        }
        return (
            <div>
                <Header title="活动专场" leftIcon='fanhui'/>
                {/*活动专场头部*/}
                <div className={"brand-top"}  style={{backgroundImage:'url('+this.state.img_url+'/public/wechat/active/brand_bg.png)'}}>
                    <img src={images[this.state.activity.merchant.logo_image]?images[this.state.activity.merchant.logo_image]:'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='} onLoad={this.loadImage.bind(this,this.state.activity.merchant.logo_image)}/>
                    <div className="brand-title">{this.state.activity.merchant.show_name}</div>
                    <div className="brand-desc">{this.state.activity.goods_count ? this.state.activity.goods_count : 0}款商品
                        {
                            this.state.activity.mtag?(
                                <label>{this.state.activity.mtag}</label>
                            ):('')
                        }
                        </div>


                </div>
                <ul>
                    {/*<Link to={`/pages/event/event?activity_id=${this.state.activity.activity_id}`}>*/}
                        <li className={'active-item'} key={this.state.activity.activity_id}>
                            <div className={'active-detail'}>
                                <div className={'active-title'}>{this.state.activity.name}</div>
                                {
                                    this.state.activity.activity_type=='hot'||this.state.activity.activity_type=='hotcake'?(
                                        <div  className={'active-time'}><span>进行中</span>距活动结束仅剩{Util.count(this.state.activity.to_time,this.state.current_time)}</div>
                                    ):(
                                        <div  className={'active-time advance'}><span>预告</span>{Util.dateFormat('MM月dd hh:mm',this.state.activity.from_time)}开抢</div>
                                    )
                                }
                                <div className={'active-desc'}>{this.state.activity.description}</div>
                                <div className={'active-img'}>
                                    {
                                        this.state.activity.images.map((item, index) => {
                                            return (<img key={item.image_id}
                                                         src={images[item.image_id] ? images[item.image_id] : 'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='}
                                                         onLoad={this.loadImage.bind(this, item.image_id)}/>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    this.state.activity.activity_type=='hot'||this.state.activity.activity_type=='hotcake'?(
                                        <div  className={'end-time'}>结束时间{Util.dateFormat('MM月dd hh:mm',this.state.activity.to_time)}开抢<span>分享活动</span></div>
                                    ):(
                                        <div  className={'end-time advance'}>开始时间{Util.dateFormat('MM月dd hh:mm',this.state.activity.from_time)}开抢<span>分享活动</span></div>
                                    )
                                }
                            </div>
                        </li>
                    {/*</Link>*/}
                </ul>
                <SingleGood data={this.state.data_list}/>
            </div>
        )
    }
}
export default Activity;