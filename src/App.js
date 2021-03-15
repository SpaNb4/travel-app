import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import classes from './App.module.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import bg from './assets/images/bg.jpg';

import Home from './containers/home/';
import Country from './containers/country/';
import { LocalStorageKeys, DEFAULT_LANGUAGE } from './common/constants';

import { updateCurrLng } from './store/app/actions';
import { getCurrLng } from './store/app/slices';
import { fetchCountries } from './store/countries/actions';
import { loginSuccess } from './store/app/actions';

function App() {
	const dispatch = useDispatch();
	const currLng = useSelector(getCurrLng);

	useEffect(() => {
		dispatch(updateCurrLng(localStorage.getItem(LocalStorageKeys.Language) || DEFAULT_LANGUAGE));
		const username = localStorage.getItem(LocalStorageKeys.Username) || null;
		if (username) {
			dispatch(loginSuccess(username));
		}
		dispatch(fetchCountries(currLng));
	}, [currLng]);

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
