import React, { useEffect, useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import WeatherProvider from './WeatherProvider';
import classes from './Weather.module.scss';
import { useTranslation } from 'react-i18next';

function Weather({ cityName, lang, countryCode }) {
	const [weatherData, setWeatherData] = useState();
	const [t] = useTranslation();
	const mountedRef = useRef(false);

	useEffect(() => {
		mountedRef.current = true;

		return () => {
			mountedRef.current = false;
		};
	}, []);

	useEffect(async () => {
		const weatherData = await WeatherProvider.retrieveWeather(cityName, lang, countryCode);

		if (mountedRef.current) {
			setWeatherData(weatherData);
		}
	}, [lang]);

	if (!weatherData) return <div>{t('Loading')}</div>;

	if (!('name' in weatherData)) return <p className={classes.ErrorMsg}>{t('Failed to retrieve weather')}</p>;

	const iconUrl = weatherData.iconURL;

	return (
		<div className={classes.Weather}>
			<p className={classes.City}>{cityName}</p>
			<p className={classes.Description}>
				{weatherData.description}
				<img src={iconUrl} alt={weatherData.description} />
			</p>
			<p className={classes.Parameters}>
				{t('Current')}: {weatherData.temp}°
			</p>
			<p className={classes.Parameters}>
				{t('High')}: {weatherData.tempMax}°
			</p>
			<p className={classes.Parameters}>
				{t('Low')}: {weatherData.tempMin}°
			</p>
			<p className={classes.Parameters}>
				{t('Wind Speed')}: {weatherData.windSpeed} {t('mi/hr')}
			</p>
		</div>
	);
}

Weather.propTypes = {
	cityName: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired,
	countryCode: PropTypes.string.isRequired,
};
export default React.memo(Weather);
