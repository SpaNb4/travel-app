import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import classes from './App.module.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import bg from './assets/images/bg.jpg';

import Home from './containers/home/';
import Country from './containers/country/';

import { updateCurrLng } from './store/app/actions';
import { fetchCountries } from './store/countries/actions';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateCurrLng(localStorage.getItem('lng') || 'en'));
		dispatch(fetchCountries());
	}, []);

	return (
		<div className={classes.App} style={{ backgroundImage: `url(${bg})` }}>
			<Header />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/country/:id" component={Country} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
