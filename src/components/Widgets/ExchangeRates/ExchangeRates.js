import React, { useState, useEffect } from 'react';
import fx from 'money';
import classes from './ExchangeRates.module.scss';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';

function ExchangeRates({ currency }) {
	const [rateUSD, setRateUSD] = useState(0);
	const [rateEUR, setRateEUR] = useState(0);
	const [rateRUB, setRateRUB] = useState(0);

	useEffect(() => {
		let setCurrency = () => {
			setRateUSD(fx(1).from(currency).to('USD').toFixed(2));
			setRateEUR(fx(1).from(currency).to('EUR').toFixed(2));
			setRateRUB(fx(1).from(currency).to('RUB').toFixed(2));
		};

		fetch('https://api.exchangerate.host/latest')
			.then((resp) => resp.json())
			.then((data) => (fx.rates = data.rates))
			.then(setCurrency);
	}, []);

	return (
		<div className={classes.ExchangeRates}>
			<Typography className={classes.ExchangeTitle}>
				<AttachMoney />
				Exchange Rates
			</Typography>
			<div className={classes.CurrencyContainer}>
				<span className={classes.СurrencyName}>USD: </span>
				<span className={classes.CurrencyValue}>{rateUSD}</span>
			</div>
			<div className={classes.CurrencyContainer}>
				<span className={classes.СurrencyName}>EUR: </span>
				<span className={classes.CurrencyValue}>{rateEUR}</span>
			</div>
			<div className={classes.CurrencyContainer}>
				<span className={classes.СurrencyName}>RUB: </span>
				<span className={classes.CurrencyValue}>{rateRUB}</span>
			</div>
		</div>
	);
}

ExchangeRates.propTypes = {
	currency: PropTypes.string.isRequired,
};

export default ExchangeRates;
