import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Map from './Map/Map';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCurrLng } from '../../store/app/slices';
import { getCountryLoading, getCurrentCountry, getCurrentId } from '../../store/country/slices';
import Overview from '../Overview/';
import ImageGallery from './ImageGallery/ImageGallery';
import Widgets from '../Widgets/Widgets';
import Video from './Video/Video';

import { fetchCountry } from '../../store/country/actions';

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

export function CountryGrid() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const currentId = useSelector(getCurrentId);
	const currLng = useSelector(getCurrLng);
	const country = useSelector(getCurrentCountry);
	const loading = useSelector(getCountryLoading);

	useEffect(() => {
		if (currentId) {
			dispatch(fetchCountry(currentId, currLng));
		}
	}, [currentId, currLng]);

	const overview = country && <Overview country={country} />;
	const fetchLoader = loading && <CircularProgress />;
	const loader = !country && <CircularProgress />;
	const video = country && <Video videoUrl={country.videoUrl} />;

	console.log(country);

	return (
		<Container className={classes.columnGrid}>
			<Grid container spacing={4}>
				{loader || fetchLoader}
				{country && window.location.href.includes(country.id) && (
					<>
						<Grid item xs={12} sm={8} className={classes.columnLeft}>
							<Container className={classes.contentGrid}>
								<Grid container spacing={4}>
									{overview}
									<ImageGallery places={country.places} />
								</Grid>
							</Container>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.columnRight}>
							<Container className={classes.contentGrid}>
								<Grid container spacing={4}>
									<Map country={country.name} />
									<Widgets country={country} />
									{video}
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
