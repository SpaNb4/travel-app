import React from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './SimpleCard.scss'

const useStyles = makeStyles({
	root: {},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const SimpleCard = ({ country }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				{country.countryName.en}
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

SimpleCard.propTypes = {
	country: PropTypes.shape({
		countryName: PropTypes.shape({
			en: PropTypes.string,
			ru: PropTypes.string,
			de: PropTypes.string,
		}),
	}).isRequired,
}

export default SimpleCard;
