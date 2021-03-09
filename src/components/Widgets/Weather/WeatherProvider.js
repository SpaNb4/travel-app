const apiKey = 'b1b35bba8b434a28a0be2a3e1071ae5b';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const assetsBaseURL = 'http://openweathermap.org/img/w';
const iconExtension = 'png';
const units = 'metric';

function makeWeatherIconURL(iconName) {
	return `${assetsBaseURL}/${iconName}.${iconExtension}`;
}

export function retrieveWeather(cityName, lang) {
	const url = `${baseURL}?q=${cityName}&units=${units}&appid=${apiKey}&lang=${lang}`;

	return fetch(url)
		.then((res) => (res.ok ? res.json() : null))
		.then((json) => {
			if (json !== null) {
				const weather = json.weather[0];

				return {
					name: json.name,
					temp: json.main.temp,
					tempMax: json.main.temp_max,
					tempMin: json.main.temp_min,
					windSpeed: json.wind.speed,
					iconURL: makeWeatherIconURL(weather.icon),
					description: weather.description,
				};
			}
			return {};
		});
}
