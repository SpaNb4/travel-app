import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { startGame } from './store/something1/actions1';
import classes from './App.module.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './containers/home/';
import Country from './containers/country/';

function App() {
	return (
		<div className={classes.App}>
			<Header />
			<Router>
				<Switch>
					<Route>
						<Home exact to="/" />
					</Route>
					<Route>
						<Country exact to="/:id" />
					</Route>
				</Switch>
			</Router>
			<Footer />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		isGameStart: state.reducer1.isGameStart,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		startGame: () => dispatch(startGame()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
