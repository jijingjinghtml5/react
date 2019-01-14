import React,{Component} from 'react'
import { Button,Toast,Modal } from 'antd-mobile';
import {NavLink as Link } from 'react-router-dom';
import { Header,Footer } from '../../component/common';
import PropTypes from 'prop-types';
import { Tool,Util } from '../../util';
import './cart.less';

class Cart extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    componentDidMount(){
        let _this = this;
        _this.getCart();
    }
    // 请求购物车数据
    async getCart(){
        let res = await Tool.post('/m/cart.html',{});
        {/*<=> true ? console.log('if-else肯定') */}
        {/*: console.log('if-else否定');*/}
        if(res.success){
            console.log(res.data);
            this.setState({
                cart_empty:'NO',
                cartdata:res.data
            })
        }else{
            console.log(res);
            if(res.redirect.includes("/m/cart-blank.html")){
                this.setState({
                    cart_empty:'YES'
                })
            }else{
                Modal.alert('温馨提示', res.error, [
                    {
                        text: 'Ok',
                        onPress: () =>
                            new Promise((resolve) => {
                                Toast.info('onPress Promise', 1);
                                setTimeout(resolve, 1000);
                            }),
                    },
                ]);
            }
        }
    }
    loadImage(image_id){
        Util.loadImage(this,image_id, 'm');
    }
    render(){
        let images = this.state.images;
        if(!images){
            images = {};
        }
        let {cart_empty,cartdata} = this.state;
        if(!cart_empty) return null;
        return (
            <div className="Product">
                <Header title={"购物车"}></Header>
                {
                    cart_empty=='NO'?(
                        <div>
                            <ul className="cart-object">
                                {
                                    cartdata.objects.map((item,idx)=>{
                                        console.log(item);
                                        return (
                                            <li className={"merchant-item"} key={item.merchant.merchant_id}>
                                                <h5>{item.merchant.show_name}</h5>
                                                {
                                                    item.objects.goods.map(goods=>{
                                                        return (
                                                            <div className={"goods-item"} key={goods.obj_ident}>
                                                                {/*{goods.item.product.product_id}*/}
                                                                <div className={"image-block"}>
                                                                    <img onLoad={this.loadImage.bind(this,goods.item.product.image_id)} src={images[goods.item.product.image_id]?images[goods.item.product.image_id]:'data:image/gif;base64,R0lGODlhAQABAIAAAO/v7////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw=='}/>
                                                                </div>
                                                                <div className={"goods-detail"}>
                                                                    <div className={"goods-name"}>
                                                                        {goods.item.product.name}
                                                                    </div>
                                                                    <div className={"goods-spec"}>
                                                                        {goods.item.product.spec_info}
                                                                    </div>
                                                                    <div className={"goods-price"}>
                                                                        ￥{goods.item.product.buy_price}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className={"cart-footer"}>
                                <button>立即结算</button>
                            </div>
                        </div>
                    ):(
                        <div>~购物车为空，去逛逛吧~</div>
                    )
                }
                <Footer type={"cart"}/>
            </div>
        )
    }
}

export default Cart