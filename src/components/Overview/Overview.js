import React from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { InternalUrls } from '../../common/constants';
import { buildUrl } from '../../common/helpers';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		padding: theme.spacing(4),
		color: theme.palette.common.white,
		background: ({ url }) => {
			const GifUrl = url.substring(0, url.length - 3);
			return `center / cover no-repeat rgba(0, 0, 0, .3) url(${buildUrl(InternalUrls.Gif, GifUrl, 'gif')})`;
		},
		backgroundBlendMode: 'multiply',
		borderRadius: '10px 10px 0px 0px',
	},
	subtitle: {
		verticalAlign: 'middle',
		display: 'inline-flex',
	},
}));

const Overview = ({ country }) => {
	const url = country.imageUrl;
	const classes = useStyles({ url });

	return (
		<Grid item className={classes.root} xs={12}>
			<Typography variant="h5" gutterBottom>
				{country.name}
			</Typography>
			<Typography variant="subtitle1" paragraph className={classes.subtitle}>
				<LocationCityIcon />
				<span>{country.capital}</span>
			</Typography>
			<Typography variant="body2" gutterBottom>
				{country.description}
			</Typography>
		</Grid>
	);
};

Overview.propTypes = {
	country: PropTypes.shape({
		name: PropTypes.string,
		capital: PropTypes.string,
		description: PropTypes.string,
		imageUrl: PropTypes.string,
	}).isRequired,
};

export default Overview;
