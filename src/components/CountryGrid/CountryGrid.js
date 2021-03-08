import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Map from './Map/Map';
import ImageGallery from './ImageGallery/ImageGallery';

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
	sightContainer: {
		border: '1px solid red',
		backgroundColor: 'yellowgreen',
	},
	sightGrid: {
		paddingRight: 0,
		paddingLeft: 0,
		minHeight: 320,
	},
}));

const Overview = () => {
	const classes = useStyles();

	return (
		<Grid item className={classes.blockContainer} xs={12}>
			<Typography variant="h4" gutterBottom>
				Country
			</Typography>
		</Grid>
	);
};

const Widgets = () => {
	const classes = useStyles();

	return (
		<Grid item className={classes.blockContainer} xs={12}>
			<Typography variant="h4" gutterBottom>
				W-s
			</Typography>
		</Grid>
	);
};

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

const ColumnLeft = () => {
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={8} className={classes.columnLeft}>
			<Container className={classes.contentGrid}>
				<Grid container spacing={4}>
					<Overview />
					<ImageGallery />
				</Grid>
			</Container>
		</Grid>
	);
};

const ColumnRight = () => {
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={4} className={classes.columnRight}>
			<Container className={classes.contentGrid}>
				<Grid container spacing={4}>
					<Map country={'Belarus'} />
					<Widgets />
					<Video />
				</Grid>
			</Container>
		</Grid>
	);
};

export function CountryGrid() {
	const classes = useStyles();

	return (
		<Container className={classes.columnGrid}>
			<Grid container spacing={4}>
				<ColumnLeft />
				<ColumnRight />
			</Grid>
		</Container>
	);
}

export default CountryGrid;
