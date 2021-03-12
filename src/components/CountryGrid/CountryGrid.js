import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Map from './Map/Map';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCountriesLoading, getCurrentId, getAllCountries } from '../../store/countries/slices';
import Overview from '../Overview/';
import ImageGallery from './ImageGallery/ImageGallery';
import Widgets from '../Widgets/Widgets';
import Video from './Video/Video';
import classes from './CountryGrid.module.scss';

export function CountryGrid() {
	const countries = useSelector(getAllCountries);
	const loading = useSelector(getCountriesLoading);
	const currentId = useSelector(getCurrentId);

	const country = countries.find((country) => country.id === currentId);

	const overview = country && <Overview country={country} />;
	const loader = loading && <CircularProgress />;
	const video = country && <Video videoUrl={country.videoUrl} />;

	return (
		<Container className={classes.columnGrid}>
			<Grid container>
				{country && window.location.href.includes(country.id) && (
					<>
						<Grid item xs={12} sm={8} className={classes.columnLeft}>
							<Container disableGutters className={classes.contentGrid}>
								<Grid container>
									{loader}
									{overview}
									<ImageGallery places={country.places} />
								</Grid>
							</Container>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.columnRight}>
							<Container disableGutters className={classes.contentGrid}>
								<Grid container>
									<Map country={country.countryName.en} />
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
