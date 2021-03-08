import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import classes from './App.module.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './containers/home/';
import Country from './containers/country/';

import { updateCurrLng } from './store/app/actions';
import { fetchCountries } from './common/services';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateCurrLng(localStorage.getItem('lng') || 'en'));
		dispatch(fetchCountries());
	}, []);

	return (
		<div className={classes.App}>
			<Header />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/country/:id" component={Country} />
				</Switch>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
