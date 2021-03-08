import React from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationCityIcon from '@material-ui/icons/LocationCity';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		padding: theme.spacing(4),
		color: theme.palette.primary.contrastText,
		background: 'url(https://images.unsplash.com/photo-1586785096421-54bc44db585f) rgba(0, 0, 0, 0.3)',
		backgroundSize: 'cover',
		backgroundBlendMode: 'multiply',
	},
	subtitle: {
		verticalAlign: 'middle',
		display: 'inline-flex',
	},
}));

const Overview = ({ country }) => {
	const classes = useStyles();

	return (
		<Grid item className={classes.root} xs={12}>
			<Typography variant="h4" gutterBottom>
				{country.countryName.en}
			</Typography>
			<Typography variant="subtitle1" paragraph className={classes.subtitle}>
				<LocationCityIcon />
				<span>{country.capitalName.en}</span>
			</Typography>
			<Typography variant="body2" gutterBottom>
				{country.description.en}
			</Typography>
		</Grid>
	);
};

// const MultiPropTypes = PropTypes.shape({
//     en: PropTypes.string,
//     ru: PropTypes.string,
//     de: PropTypes.string,
// }),

Overview.propTypes = {
	country: PropTypes.shape({
		countryName: PropTypes.shape({
			en: PropTypes.string,
			ru: PropTypes.string,
			de: PropTypes.string,
		}),
		capitalName: PropTypes.shape({
			en: PropTypes.string,
			ru: PropTypes.string,
			de: PropTypes.string,
		}),
		description: PropTypes.shape({
			en: PropTypes.string,
			ru: PropTypes.string,
			de: PropTypes.string,
		}),
	}).isRequired,
};

export default Overview;
