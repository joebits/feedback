import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
<Provider store = {store}><App/></Provider>, 
document.querySelector('#root'));

console.log('STRIPE KEY: ', process.env.REACT_APP_STRIPE_KEY);
console.log('ENV is: ', process.env.NODE_ENV);