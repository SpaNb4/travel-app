import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { retrieveWeather } from './WeatherProvider';
import classes from './Weather.module.scss';
import { useTranslation } from 'react-i18next';

function Weather({ cityName, countryCode }) {
	const [weatherData, setWeatherData] = useState();
	useEffect(() => {
		retrieveWeather(countryCode, cityName).then((weatherData) => {
			setWeatherData(weatherData);
		});
	}, []);
	const [t] = useTranslation();
	if (!weatherData) return <div>{t('Loading')}</div>;
	if (!('name' in weatherData)) return <div>{t('Failed to retrieve weather')}</div>;
	const iconUrl = weatherData.iconURL;
	return (
		<div className={classes.Weather}>
			<h1>
				{weatherData.mainDescription} in {weatherData.name}
				<img src={iconUrl} alt={weatherData.description} />
			</h1>
			<p>
				{t('Current')}: {weatherData.temp}°
			</p>
			<p>
				{t('High')}: {weatherData.tempMax}°
			</p>
			<p>
				{t('Low')}: {weatherData.tempMin}°
			</p>
			<p>
				{t('Wind Speed')}: {weatherData.windSpeed} {t('mi/hr')}
			</p>
		</div>
	);
}

Weather.propTypes = {
	cityName: PropTypes.string.isRequired,
	countryCode: PropTypes.string.isRequired,
};
export default Weather;
