import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import './MainGrid.scss';

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
	const loader = loading && (
		<div className="container loader__container">
			<CircularProgress />
		</div>
	);
	return (
		<Container maxWidth="md" className="main-grid">
			{loader}
			<Grid container spacing={4}>
				{items}
			</Grid>
		</Container>
	);
}
