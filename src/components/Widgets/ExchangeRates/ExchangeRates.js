/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fx from 'money';
import classes from './ExchangeRates.module.scss';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';

function ExchangeRates({ currency }) {
	const DECIMAL_PLACES = 3;
	const EXCHANGE_VALUE = 1;
	const CURRENCY_USD = 'USD';
	const CURRENCY_EUR = 'EUR';
	const CURRENCY_RUB = 'RUB';

	const [rates, setRates] = useState(null);
	const [t] = useTranslation();

	useEffect(() => {
		let setCurrency = () => {
			setRates([
				{
					currency: CURRENCY_USD,
					exchangeRate: fx(EXCHANGE_VALUE).from(currency).to(CURRENCY_USD).toFixed(DECIMAL_PLACES),
				},
				{
					currency: CURRENCY_EUR,
					exchangeRate: fx(EXCHANGE_VALUE).from(currency).to(CURRENCY_EUR).toFixed(DECIMAL_PLACES),
				},
				{
					currency: CURRENCY_RUB,
					exchangeRate: fx(EXCHANGE_VALUE).from(currency).to(CURRENCY_RUB).toFixed(DECIMAL_PLACES),
				},
			]);
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
				{t('Exchange Rates') + ` ${t(currency)}`}
			</Typography>
			{rates
				? rates.map((rate, index) => {
						return (
							<div key={index} className={classes.CurrencyContainer}>
								<Typography variant="inherit" className={classes.СurrencyName}>
									{t(rate.currency)}:
								</Typography>
								<Typography variant="inherit" className={classes.CurrencyValue}>
									&nbsp;{rate.exchangeRate}
								</Typography>
							</div>
						);
				  })
				: null}
		</div>
	);
}

ExchangeRates.propTypes = {
	currency: PropTypes.string.isRequired,
};

export default ExchangeRates;
