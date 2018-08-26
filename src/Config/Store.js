import { createStore } from 'redux';//, combineReducers, applyMiddleware

const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};
var store = createStore(
    reducer
);

export default store;


