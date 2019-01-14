import React,{Component} from 'react'
import { Button,Toast,Modal } from 'antd-mobile';
import {NavLink as Link } from 'react-router-dom';
import { Header,Footer } from '../../component/common';
import PropTypes from 'prop-types';
import { Tool,Util } from '../../util';
// import './activity.less';

class Activity extends Component {
    constructor(){
        super();
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
    render(){
        return (
            <ul></ul>
        )
    }
}