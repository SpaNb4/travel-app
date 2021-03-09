import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import GridItem from './GridItem';

import {
	getCountriesLoading,
	getSearchValue,
	getFilteredCountries,
	getAllCountries,
} from '../../store/countries/slices';

export default function MainGrid() {
	const countries = useSelector(getAllCountries);
	const filteredCountries = useSelector(getFilteredCountries);
	const loading = useSelector(getCountriesLoading);
	const searchValue = useSelector(getSearchValue);

	const items =
		(searchValue &&
			filteredCountries.length &&
			filteredCountries.map((country) => <GridItem key={country.id} country={country} />)) ||
		(searchValue && !filteredCountries.length && <p>No countries found</p>) ||
		(countries && countries.map((country) => <GridItem key={country.id} country={country} />));
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
