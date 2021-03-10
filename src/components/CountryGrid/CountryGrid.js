import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Map from './Map/Map';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCountriesLoading, getCurrentId, getAllCountries } from '../../store/countries/slices';
import Overview from '../Overview/';
import ImageGallery from './ImageGallery/ImageGallery';
import Widgets from '../Widgets/Widgets';

const useStyles = makeStyles((theme) => ({
	columnGrid: {
		padding: theme.spacing(4),
		backgroundColor: 'grey',
	},
	contentGrid: {
		padding: theme.spacing(4),
		backgroundColor: 'grey',
	},
	columnLeft: {
		backgroundColor: 'purple',
		minHeight: 320,
	},
	columnRight: {
		backgroundColor: 'red',
		minHeight: 320,
	},
	blockContainer: {
		padding: theme.spacing(4),
		border: '1px solid red',
		backgroundColor: 'pink',
		minHeight: 320,
	},
}));

const Video = () => {
	const classes = useStyles();

	return (
		<Grid item className={classes.blockContainer} xs={12}>
			<Typography variant="h4" gutterBottom>
				Video
			</Typography>
		</Grid>
	);
};

export function CountryGrid() {
	const classes = useStyles();

	const countries = useSelector(getAllCountries);
	const loading = useSelector(getCountriesLoading);
	const currentId = useSelector(getCurrentId);

	const country = countries.find((country) => country.id === currentId);

	const overview = country && <Overview country={country} />;
	const loader = loading && <CircularProgress />;

	return (
		<Container className={classes.columnGrid}>
			<Grid container spacing={4}>
				{country && (
					<>
						<Grid item xs={12} sm={8} className={classes.columnLeft}>
							<Container className={classes.contentGrid}>
								<Grid container spacing={4}>
									{loader}
									{overview}
									<ImageGallery places={country.places} />
								</Grid>
							</Container>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.columnRight}>
							<Container className={classes.contentGrid}>
								<Grid container spacing={4}>
									<Map country={country.countryName.en} />
									<Widgets country={country} />
									<Video />
								</Grid>
							</Container>
						</Grid>
					</>
				)}
			</Grid>
		</Container>
	);
}

export default CountryGrid;
