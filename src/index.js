import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Provider} from 'react-redux'
import store from './store'
import { BrowserRouter, Switch, Route,Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history'
import 'bootstrap/dist/css/bootstrap.css';

import ProductListing from './components/products/ProductListing';
import Adress from './components/address/Adress';
import Cart from './components/cart/Cart';
import Header from './components/sub_parts/Header';

const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter history={history}>
			<Header />
			<Switch>
				<Route exact path="/" render={props => <ProductListing {...props} />} />
				<Route exact path="/products" render={props => <ProductListing {...props} />} />
				<Route exact path="/address" render={props => <Adress {...props} />} />
				<Route exact path="/cart" render={props => <Cart {...props} />} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);