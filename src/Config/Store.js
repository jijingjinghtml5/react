import { createStore, combineReducers } from 'redux';//, combineReducers, applyMiddleware
import reducer from '../pages/index/reducer'

var store = createStore(
    combineReducers(reducer)
);

export default store;


