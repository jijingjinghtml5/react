import React, { Component } from 'react';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import route from './Config/Route'; //路由配置
import '../node_modules/antd-mobile/dist/antd-mobile.min.css'
import './Style/style.less'; //加载公共样式
// import './App.css'; //公共图标
class App extends Component {
  render() {
    return (
        <div className="App">
      		{route}
        </div>
    );
  }
}

export default App;
