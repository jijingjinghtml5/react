import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import store from './Config/Store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';


console.log(store);

ReactDOM.render(
	<Provider store={store}>
	    <App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
