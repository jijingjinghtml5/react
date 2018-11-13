import React, { Component } from 'react';
import {NavLink as Link } from 'react-router-dom';
import { Header } from '../../component/common';
import { Carousel, WingBlank, Modal, Toast} from 'antd-mobile';
import PropTypes from 'prop-types';
import {Tool, Util} from "../../util";
import './product.less';

export default class Product extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    componentDidMount(){
        //this.check_login();
        let search = this.props.location.search ;
        search = search.slice(1,);
        let arr = search.split('&');
        let _this = this;
        arr.forEach(function(item,key) {
            let single = item.split('=');
            if(single[0] == 'product_id'){
                _this.setState({
                    product_id:single[1]
                })
                _this.onLoad(single[1]);
            }
        });
    }
    async onLoad(product_id){
        let res = await Tool.post('/m/item-' + product_id + '.html',{});
        this.setState({
            data_detail:res.data_detail
        })
    }
    loadImage(image_id){
        console.log('image_id'+image_id);
        Util.loadImage(this,image_id, 'm');
        console.log(this.state);
        window.dispatchEvent(new Event('resize'));
        this.setState({ imgHeight: 'auto' });
    }
    buy_now(pid){
        console.log(pid);
    }
    async add_cart(pid){
        let res = await Tool.post(`/m/cart-add-${pid}-1.html`,{});
        let _this = this;
        if(res.success){
            Toast.success('加入成功', 3, function(){
                _this.context.router.history.push('/pages/cart/cart');
            }, true)
        }else{
            Modal.alert('温馨提示', res.error, [
                {
                    text: 'Ok',
                    onPress: () => {

                    }
                },
            ])
        }
    }
    render() {
        let images = this.state.images;
        if(!images){
            images = [];
        }
        if(!this.state.data_detail) return null;
        let data_detail = this.state.data_detail;
        return (
            <div className="Product">
                <Header title="商品详情" leftIcon="fanhui"/>
                <div className="content">
                    {this.state.data_detail.images?(
                        <Carousel
                            autoplay={true}
                            infinite
                            slideWidth={1}
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data_detail.images.map(item => (
                                <a
                                    key={item.image_id}
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={images[item.image_id]?images[item.image_id]:'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='} onLoad={this.loadImage.bind(this,item.image_id)}
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    ):''}
                    {
                        data_detail.spec_desc.t?(
                            data_detail.spec_desc.t.map(function(item,idx){
                                <label>{item}：</label>
                                data_detail.spec_desc.v[idx].map((spec,index)=>{
                                    <span>{spec.label}</span>
                                })
                            })
                        ):''
                    }
                    <div className="product-detail">
                        <div className="p-name">{this.state.data_detail.product.name}</div>
                        {this.state.data_detail.product.spec_info ? (
                            <div className="product-sepc-info">{this.state.data_detail.product.spec_info}</div>
                        ) : ''}
                    </div>
                    <div className="product-desc">
                        <p className="product-title">商品详情</p>
                        <p dangerouslySetInnerHTML={{ __html: this.state.data_detail.description }}></p>
                    </div>
                </div>
                <div className="product-footer">
                    <label>
                        <Link to={"/pages/index/index"}>首页</Link>
                    </label>
                    <label>
                        <Link to={"/pages/cart/cart"}>购物车</Link>
                    </label>
                    <button className="buyNow" onClick={this.buy_now.bind(this,this.state.data_detail.product.product_id)}>立即购买</button>
                    <button className="addCart" onClick={this.add_cart.bind(this,this.state.data_detail.product.product_id)}>加入购物车</button>
                </div>
            </div>
        );
    }
}
Product.contextTypes = {
    router: PropTypes.object.isRequired
}