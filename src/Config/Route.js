import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import getComponent from '../common/getComponent';
// import Index from '../pages/index/index'; //首页组件
// import MemberIndex from '../pages/member/index';//个人中心
// import Login from '../pages/login/login';//登录
// import Category from '../pages/category/category';//登录
// import MemberSignout from '../pages/member/signout/index';//登录
const history = createBrowserHistory();


const routes = [
	{ path: '/',
		exact: true,
		component: (props) => getComponent(props, () => import('../pages/index/index'))
	},
	{ path: '/pages/index/index',
		exact: false,
		//component: Index
		component: (props) => getComponent(props, () => import('../pages/index/index'))
	},
	{ path: '/pages/member/index',
		exact: false,
		//component: MemberIndex
		component: (props) => getComponent(props, () => import('../pages/member/index'))
	},
	{ path: '/pages/login/login',
		exact: false,
		//component: Login
		component: (props) => getComponent(props, () => import('../pages/login/login'))
	},
	{ path: '/pages/category/category',
		exact: false,
		//component: Category
		component: (props) => getComponent(props, () => import('../pages/category/category'))
	},
	{ path: '/pages/gallery/gallery',
		exact: false,
		//component: Category
		component: (props) => getComponent(props, () => import('../pages/gallery/gallery'))
	},
	{ path: '/pages/member/signout/index',
		exact: false,
		//component: MemberSignout
		component: (props) => getComponent(props, () => import('../pages/member/signout/index'))
	},
    { path: '/pages/product/product',
        exact: false,
        //component: Product
        component: (props) => getComponent(props, () => import('../pages/product/product'))
    },
    { path: '/pages/cart/cart',
        exact: false,
        //component: Cart
        component: (props) => getComponent(props, () => import('../pages/cart/cart'))
    }
];
/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}
// var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
const supportsHistory = 'pushState' in window.history;
let Router = process.env.NODE_ENV !== 'production' ? BrowserRouter : HashRouter;
const RouteConfig = (
    <Router forceRefresh={!supportsHistory}  history={history}>
	    <Switch>
	      {/*<Route path="/" exact component={IndexList} />*/}
		    {routes.map((route, index) => (
			    <Route
				    key={index}
				    path={route.path}
				    exact={route.exact}
				    component={route.component}
			    />
		    ))}
		    {/*<Route path="/topic/create" component={TopicCreate} />*/}
		    {/*<Route path="/topic/:id" component={Topic} />*/}
		    {/*<Route path="/my/messages" component={MyMessages} />*/}
		    {/*<Route path="/user/:loginname" component={UserView} />*/}
		    {/*<Route path="/signin" component={Signin} />*/}
		    {/*<Route path="/signout" component={Signout} />*/}
		    <Redirect from='' to="/" />
	    </Switch>
    </Router>
);

export default RouteConfig;