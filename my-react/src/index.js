
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

const store = createStore(counter,compose(
		applyMiddleware(thunk),
		window.devToolsExtension?window.devToolsExtension():()=>{}
	)
)
function Second(){
	return <h2>2222222</h2>
}
function Third(){
	return <h2>3333333</h2>
}
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
			<div>
				<ul>
					<li>
						<Link to="/">11</Link>
					</li>
					<li>
						<Link to="/Second">22</Link>
					</li>
					<li>
						<Link to="/Third">33</Link>
					</li>
				</ul>
				<Switch>
					<Route path="/" exact component={App}></Route>
					<Route path="/Second" component={Second}></Route>
					<Route path="/Third" component={Third}></Route>
					<Route path="/:location" component={Test}></Route>
				</Switch>
				
				
			</div>
		</BrowserRouter>
	</Provider>
	),
	document.getElementById('root')
)

