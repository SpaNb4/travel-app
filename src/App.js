import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
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

const theme = createMuiTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 769,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	palette: {
		primary: {
			main: '#32c7e3',
		},
		secondary: {
			main: '#fcd93a',
		},
	},
	typography: {
		fontFamily: 'Roboto',
	},
});

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
		<ThemeProvider theme={theme}>
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
		</ThemeProvider>
	);
}

export default App;
