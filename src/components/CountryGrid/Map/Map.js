import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import L from 'leaflet';
// eslint-disable-next-line no-unused-vars
import fullscreenControl from 'leaflet-fullscreen';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	blockContainer: {
		padding: theme.spacing(4),
		minHeight: 320,
	},
	map: {
		height: 320,
	},
}));

export default function Map() {
	const MAP_CONTAINER_ID = 'mapID';
	const classes = useStyles();

	useEffect(() => {
		var map = new L.Map(MAP_CONTAINER_ID, {
			fullscreenControl: true,
		}).setView([51.505, -0.09], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1Ijoic3BhbmI0IiwiYSI6ImNrbHppaG1kNDNkMjcydm53N2cyZHo0ejIifQ.g6wOxheIsu-2UQMyagt1JQ',
		}).addTo(map);
	}, []);

	return (
		<Grid item className={classes.blockContainer} xs={12}>
			<div id={MAP_CONTAINER_ID} className={classes.map}></div>
		</Grid>
	);
}
