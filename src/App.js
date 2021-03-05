import React from 'react';
import { connect } from 'react-redux';
import { startGame } from './store/something1/actions1';
import classes from './App.module.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
	return (
		<div className={classes.App}>
			<Header />
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
