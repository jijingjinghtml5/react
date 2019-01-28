import React, { Component } from 'react';
import { Header,Footer } from '../../component/common';
import PageDesign from '../../component/pagedesign';
import {Carousel, SearchBar, Toast} from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import {Tool, Util} from '../../util';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from './action'
import './index.less'
import {NavLink as Link} from "react-router-dom";
let totalPage = 0;
let current_page = 1;

class Index extends Component{
	constructor(){
		super();
        this.state = {
            type:'hot',
            page:1,
            images:{},
            hasmore:false,
            data_list:[]
        }
	}
	componentDidMount(){
	    let _this = this;
        current_page = 1;
		_this.getData(this.state.type,this.state.page);
        window.onscroll = function(){
            if(totalPage == 0 || current_page <= _this.state.pager.total){
                if(Util.getScrollTop() + Util.getWindowHeight()+1 >= Util.getScrollHeight()){
                    _this.getData(_this.state.type);
                }
            }else{
                _this.setState({
                    hidden:true
                })
            }
        };
	}
    loadImage(image_id){
        Util.loadImage(this,image_id, 'm');
        window.dispatchEvent(new Event('resize'));
        this.setState({ imgHeight: 'auto' });
    }
    //切换类型
    changeType(id){
        current_page = 1;
        console.log('类型');
        console.log(id);
	    this.setState({
            type:id,
            data_list:[]
        },()=>{
            this.getData();
        })
    }
	async getData(){
	    if(this.state.loading) return;
	    this.setState({
            loading:true,
            current_time: Date.parse(new Date())
        })
        console.log(this.state.type);
	    let res = await Tool.post('/m/activity-index-'+this.state.type+'-'+current_page+'.html');
        if (res.data_list) {
            this.setState({
                data_list:[...this.state.data_list,...res.data_list],
                pager:res.pager,
                banner:res.banner
            })
            totalPage = res.pager.total;
            current_page++;
        } else if(current_page==1){
            Toast.info( '暂无数据');
        }
        this.setState({
            loading:false
        })
    }
	render() {
        let images = this.state.images;
        if(!images){
            images = [];
        }
		return (
			<div className="Index">
				<Header title="首页"/>
				{/*<PageDesign/>*/}
				<SearchBar placeholder="搜索" />
				<Carousel
					autoplay={true}
					infinite
					slideWidth={1}
					beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
					afterChange={index => console.log('slide to', index)}
				>
					{this.state.banner?(
                        this.state.banner.map(item => (
                            <a className={'slide-img'}
                                key={item.image_id}
                                style={{ display: 'inline-block', width: '100%',height: this.state.imgHeight }}
                            >
                                <img
                                    src={images[item.image_id]?images[item.image_id]:'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='} onLoad={this.loadImage.bind(this,item.image_id)}
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />
                            </a>
                        ))
					):''}
				</Carousel>
                <ul className="index-tab">
                    <li className={this.state.type=='hot'?'tab-item active':'tab-item'} onClick={this.changeType.bind(this,'hot')}><span>热门活动</span></li>
                    <li className={this.state.type=='hotcake'?'tab-item active':'tab-item'} onClick={this.changeType.bind(this,'hotcake')}><span>爆款</span></li>
                    <li className={this.state.type=='advance'?'tab-item active':'tab-item'} onClick={this.changeType.bind(this,'advance')}><span>预告</span></li>
                </ul>
                <ul>
                    {
                        this.state.data_list?(
                            this.state.data_list.map((item,index)=>{
                                return (
                                    <Link to={`/pages/event/event?activity_id=${item.activity_id}`}>
                                        <li className={'active-item'} key={item.activity_id}>
                                            <label  className="active-brand"><img src={images[item.merchant.logo_image]?images[item.merchant.logo_image]:'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='} onLoad={this.loadImage.bind(this,item.merchant.logo_image)}/></label>
                                            <div className={'active-detail'}>
                                                <div className={'active-title'}>{item.name}</div>
                                                {
                                                     this.state.type=='hot'||this.state.type=='hotcake'?(
                                                         <div  className={'active-time'}><span>进行中</span>距活动结束仅剩{Util.count(item.to_time,this.state.current_time)}</div>
                                                     ):(
                                                         <div  className={'active-time advance'}><span>预告</span>{Util.dateFormat('MM月dd hh:mm',item.from_time)}开抢</div>
                                                     )
                                                 }
                                                <div className={'active-desc'}>{item.description}</div>
                                                <div className={'active-img'}>
                                                    {
                                                        item.images.map((item, index) => {
                                                            return (<img key={item.image_id}
                                                                src={images[item.image_id] ? images[item.image_id] : 'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='}
                                                                onLoad={this.loadImage.bind(this, item.image_id)}/>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                {
                                                    this.state.type=='hot'||this.state.type=='hotcake'?(
                                                        <div  className={'end-time'}>结束时间{Util.dateFormat('MM月dd hh:mm',item.to_time)}开抢<span>去抢购</span></div>
                                                    ):(
                                                        <div  className={'end-time advance'}>开始时间{Util.dateFormat('MM月dd hh:mm',item.from_time)}开抢<span>去看看</span></div>
                                                    )
                                                }
                                            </div>
                                        </li>
                                    </Link>
                                )
                            })
                        ):''
                    }
                </ul>
				<Footer type={"index"}/>
			</div>
		);
  }
}
export default connect((state) => { return { visibleDATA: state.visibleDATA }; }, action())(Index); //连接redux