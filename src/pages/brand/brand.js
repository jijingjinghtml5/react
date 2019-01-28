import React, { Component } from 'react';
import { Button,Toast } from 'antd-mobile';
import { Header,Footer } from '../../component/common';
import { Tool } from '../../util';
import PropTypes from 'prop-types';
import store from '../../Config/Store';
import * as config from '../../Config/Config';


const {target} = config;

// import Alert from '../../src/components/Alert';
export default class Brand extends Component{
    constructor(){
        super();
        this.state = {
            target:target,
            data_list:{},
            empty_list:''
        };
    }
    componentDidMount(){
        this.getData(1);
    }

    //获取数据
    async getData(page){
        let _this = this;
        let res = await Tool.post('/m/merchant-mlist-' + page + '.html');
        // if(res.data.error){
        //     Toast.info('获取失败');
        //     return;
        // }
        var newdata = res;
        var _thisdata = _this.state;
        if (newdata) {
            if (_thisdata.data_list && page > 1) {
                newdata.data_list = _thisdata.data_list.concat(newdata.data_list);
            }
            if (newdata.data_list) {

            }
            if (!newdata.data_list) {
                newdata.empty_list = 'YES';
            } else {
                newdata.empty_list = 'NO';
                // for (var i = 0; i < newdata.data_list.length; i++) {
                //     newdata.data_list[i]['image'] &&
                //         (newdata.data_list[i]['image'] = util.fixImgUrl(newdata.data_list[i]['image']));
                // }
            }
            _this.setState({
                data_list:newdata.data_list
            });
            console.log(newdata);
        }
    }
    render() {
        return (
            <div className="Brand">
                <Header title="品牌"/>
                <ul>
                    {/*{*/}
                        {/*this.state.data_list?(this.state.data_list.map((item)=>{*/}
                            {/*return (<li>{item}</li>)*/}
                        {/*})):''*/}
                    {/*}*/}
                </ul>
            </div>
        );
    }
}
Brand.contextTypes = {
    router: PropTypes.object.isRequired
}