
// import {createStore} from 'redux'
//  //1.新建store
//  //通过reducer简历
//  //根据老的state和action生成新的state

//  function counter(state=0,action){
//  	switch(action.type){
//  		case '+':
//  		    return state+1
//  		case '-':
//  			return state-1
//  		default:
//  		return state
//  	}
//  }

// const store = createStore(counter);

// const init = store.getState();
// console.log(init);
// function listener(){
// 	const current = store.getState();
// 	console.log(`现在的数量${current}`);
// }


// store.subscribe(listener);

// //派发事件
// store.dispatch({type:'+'});
// console.log(store.getState());

// store.dispatch({type:'-'});
// console.log(store.getState());


import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom'
import App from './App'
import { counter} from './index.redux'
import Auth from './Auth.js'
import Dashboard from './Dashboard'
const store = createStore(counter,compose(
		applyMiddleware(thunk),
		window.devToolsExtension?window.devToolsExtension():()=>{}
	)
)

class Test extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		console.log(this.props);
		return <h2>测试{this.props.match.params.location}</h2>
	}
}
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
				<Switch>
					<Route path="/login" component={Auth}></Route>
					<Route path="/dashboard" component={Dashboard}></Route>
					<Redirect to='/dashboard'></Redirect>
				</Switch>
			
		</BrowserRouter>
	</Provider>
	),
	document.getElementById('root')
)

