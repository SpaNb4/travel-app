import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExchangeRates from '../Widgets/ExchangeRates/ExchangeRates';
import Timer from '../Widgets/Timer/Timer';
import Weather from '../Widgets/Weather/Weather';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrLng } from '../../store/app/slices';

const useStyles = makeStyles((theme) => ({
	blockContainer: {
		padding: theme.spacing(4),
		background: '#54d2e9',
		minHeight: 320,
		borderRight: '1px solid #ffffff',
		borderLeft: '1px solid #ffffff',
	},
}));

function Widgets({ country }) {
	const classes = useStyles();
	const currLng = useSelector(getCurrLng);

	return (
		<Grid item className={classes.blockContainer} xs={12}>
			<Timer timeZone={country.timeZone} lang={currLng} />
			<ExchangeRates currency={country.currency} />
			<Weather cityName={country.name} lang={currLng} countryCode={country.id} />
		</Grid>
	);
}

Widgets.propTypes = {
	country: PropTypes.object.isRequired,
};

export default Widgets;
