import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { retrieveWeather } from './WeatherProvider';
import classes from './Weather.module.scss';
import { useTranslation } from 'react-i18next';

function Weather({ cityName, lang }) {
	const [weatherData, setWeatherData] = useState();
	const [t] = useTranslation();

	useEffect(() => {
		retrieveWeather(cityName, lang).then((weatherData) => {
			setWeatherData(weatherData);
		});
	}, [lang]);

	if (!weatherData) return <div>{t('Loading')}</div>;

	if (!('name' in weatherData)) return <div>{t('Failed to retrieve weather')}</div>;

	const iconUrl = weatherData.iconURL;

	return (
		<div className={classes.Weather}>
			<h1>
				{weatherData.description}
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
	lang: PropTypes.string.isRequired,
};
export default Weather;
