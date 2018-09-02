import { createStore } from 'redux';//, combineReducers, applyMiddleware
import visibleDATA from '../pages/index/reducer'
console.log(visibleDATA);

var store = createStore(
    visibleDATA
);

export default store;


