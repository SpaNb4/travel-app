import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './../SimpleCard';

const GridItem = () => {
	return (
		<Grid item xs={12} sm={6}>
			<SimpleCard />
		</Grid>
	);
};

const MainGrid = () => {
	return (
		<Container>
			<Grid container spacing={1}>
				<GridItem />
				<GridItem />
				<GridItem />
				<GridItem />
				<GridItem />
				<GridItem />
				<GridItem />
				<GridItem />
			</Grid>
		</Container>
	);
};

export default MainGrid;
