
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
import App from './App'


ReactDom.render(<App />,document.getElementById('root'));