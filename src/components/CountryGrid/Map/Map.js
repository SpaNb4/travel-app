import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import L from 'leaflet';
// eslint-disable-next-line no-unused-vars
import fullscreenControl from 'leaflet-fullscreen';
import Grid from '@material-ui/core/Grid';
import countriesJSON from './countries.json';
import { PropTypes } from 'prop-types';
import marker from './img/marker.jpg';
import markerShadow from './img/marker_shadow.jpg';

const useStyles = makeStyles((theme) => ({
	blockContainer: {
		padding: theme.spacing(4),
		minHeight: 320,
	},
	map: {
		height: 320,
	},
}));

function Map({ country }) {
	const MAP_CONTAINER_ID = 'mapID';
	const classes = useStyles();

	useEffect(() => {
		const map = new L.Map(MAP_CONTAINER_ID, {
			fullscreenControl: true,
		});

		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: '&copy; <a href="https://rs.school/js/">RSSchool</a>',
			minZoom: 1,
			maxZoom: 18,
			id: 'spanb4/ckm0yubff3odx17o80p42gzdg',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1Ijoic3BhbmI0IiwiYSI6ImNrbHppaG1kNDNkMjcydm53N2cyZHo0ejIifQ.g6wOxheIsu-2UQMyagt1JQ',
		}).addTo(map);

		countriesJSON.features.map((elem) => {
			if (elem.properties.name === country) {
				const defaultIcon = new L.Icon({
					iconUrl: marker,
					iconAnchor: [12, 41],
					shadowUrl: markerShadow,
				});

				L.marker(elem.capitalCoords, { icon: defaultIcon, title: elem.capitalName })
					.addTo(map)
					.bindPopup(elem.capitalName);

				const geoJSONgroup = L.geoJSON(elem, {
					style: function () {
						return {
							fillColor: '#D3D3D3',
							fillOpacity: 0.3,
							stroke: true,
							color: 'grey',
							weight: 2,
						};
					},
				}).addTo(map);

				geoJSONgroup.eachLayer(function (layer) {
					if (layer.feature.properties.name === country) {
						map.fitBounds(layer.getBounds());
					}
				});
			}
		});
	}, []);

	return (
		<Grid item className={classes.blockContainer} xs={12}>
			<div id={MAP_CONTAINER_ID} className={classes.map}></div>
		</Grid>
	);
}

Map.propTypes = {
	country: PropTypes.string.isRequired,
};

export default Map;
