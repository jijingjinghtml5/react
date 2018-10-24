import React,{Component} from 'react'
import { Toast } from 'antd-mobile';
import {NavLink as Link } from 'react-router-dom';
import { Header,Footer } from '../../component/common';
import { Tool,Util } from '../../util';
import { connect } from 'react-redux';
import './gallery.less';
let totalPage = 0;
let current_page = 1;
export default class Gallery extends Component{
    constructor(){
        super();
        this.state = {
            data_list:[],
            hidden:false
        }
    }
    componentDidMount(){
        let _this = this;
        _this.getGallery();
        window.onscroll = function(){
            if(totalPage == 0 || current_page < _this.state.pager.total){
                if(Util.getScrollTop() + Util.getWindowHeight()+1 >= Util.getScrollHeight()){
                    _this.getGallery();
                }
            }else{
                _this.setState({
                    hidden:true
                })
            }
        };
    }
    async getGallery(){

        let res = await Tool.post('/m/list.html?page='+current_page,{});
        if (res.data_list) {
            this.setState({
                data_list:[...this.state.data_list,...res.data_list],
                pager:res.pager
            })
            totalPage = res.pager.total;
            current_page++;
        } else if(current_page==1){
            Toast.info( '暂无数据');
        }
    }
    render(){
        return (
            <div className="gallery">
                <Header title="商品搜索" leftIcon='fanhui'/>
                <div className="gallery-search">
                    <input type="search"  placeholder="请输入关键词"/>
                    <span>搜索</span>
                </div>
                <ul className="gallery-list">
                    {
                        this.state.data_list.map(function (item) {
                            return (
                                <li key={item.product.product_id}>
                                    <img src={item.image} />
                                    <span className="goods-name">{item.product.name}</span>
                                    <span className="goods-price">￥{item.product.price}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="see-more" style={{display:(this.state.hidden?'none':'block')}} onClick={this.getGallery.bind(this)}>点击加载</div>
            </div>
        )
    }
}