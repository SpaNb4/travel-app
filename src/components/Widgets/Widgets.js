import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExchangeRates from '../Widgets/ExchangeRates/ExchangeRates';
import Timer from '../Widgets/Timer/Timer';
import Weather from '../Widgets/Weather/Weather';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrLng } from '../../store/app/slices';
import classes from './Widgets.module.scss';

function Widgets({ country }) {
	const currLng = useSelector(getCurrLng);

	return (
		<Grid item className={classes.Widgets} xs={12}>
			<Timer timeZone={country.timeZone} lang={currLng} />
			<ExchangeRates currency={country.currency} />
			<Weather cityName={country.capital} lang={currLng} countryCode={country.ISOCode} />
		</Grid>
	);
}

Widgets.propTypes = {
	country: PropTypes.object.isRequired,
};

export default Widgets;
