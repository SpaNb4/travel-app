import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import GridItem from './GridItem';

import countriesSlices from '../../store/countries/slices';
import { fetchCountries } from '../../store/countries/actions';

export default function MainGrid() {
	const dispatch = useDispatch();
	const countries = countriesSlices.countries();
	const loading = countriesSlices.loading();

	useEffect(() => {
		dispatch(fetchCountries());
	}, []);

	const items = countries && countries.map((country) => <GridItem key={country.id} country={country} />);
	const loader = loading && <CircularProgress />;
	return (
		<Container>
			<Grid container>
				{loader}
				{items}
			</Grid>
		</Container>
	);
}
