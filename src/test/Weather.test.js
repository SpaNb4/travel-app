import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Weather from '../components/Widgets/Weather/Weather';
import WeatherProvider from '../components/Widgets/Weather/WeatherProvider';

jest.mock('react-i18next', () => ({
	useTranslation: () => {
		return [(str) => str];
	},
}));

let container = null;
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('check that weather is loaded with dataset1', async () => {
	jest.spyOn(WeatherProvider, 'retrieveWeather').mockImplementation(() => {
		return Promise.resolve({
			name: 'Tokyo',
			temp: 13,
			tempMax: 45,
			tempMin: 0,
			windSpeed: 6,
			iconURL: '',
			description: 'it froze',
		});
	});
	await act(async () => {
		render(<Weather cityName="" lang="" countryCode="" />, container);
	});
	expect(container.textContent).toBe('it frozeCurrent: 13°High: 45°Low: 0°Wind Speed: 6 mi/hr');
	WeatherProvider.retrieveWeather.mockRestore();
});

it('check failure', async () => {
	jest.spyOn(WeatherProvider, 'retrieveWeather').mockImplementation(() => {
		return Promise.resolve({});
	});
	await act(async () => {
		render(<Weather cityName="" lang="" countryCode="" />, container);
	});
	expect(container.textContent).toBe('Failed to retrieve weather');
	WeatherProvider.retrieveWeather.mockRestore();
});

it('check that weather is loaded with dataset2', async () => {
	jest.spyOn(WeatherProvider, 'retrieveWeather').mockImplementation(() => {
		return Promise.resolve({
			name: 'Nikko',
			temp: 40,
			tempMax: 80,
			tempMin: -10,
			windSpeed: 10,
			iconURL: '',
			description: 'it hot',
		});
	});
	await act(async () => {
		render(<Weather cityName="" lang="" countryCode="" />, container);
	});
	expect(container.textContent).toBe('it hotCurrent: 40°High: 80°Low: -10°Wind Speed: 10 mi/hr');
	WeatherProvider.retrieveWeather.mockRestore();
});

it('check that weather is loaded when dataset3', async () => {
	jest.spyOn(WeatherProvider, 'retrieveWeather').mockImplementation(() => {
		return Promise.resolve({
			name: 'Berlin',
			temp: 10.9,
			tempMax: 50.71,
			tempMin: -22.3,
			windSpeed: 0,
			iconURL: '',
			description: 'light rain ',
		});
	});
	await act(async () => {
		render(<Weather cityName="" lang="" countryCode="" />, container);
	});
	expect(container.textContent).toBe('light rain Current: 10.9°High: 50.71°Low: -22.3°Wind Speed: 0 mi/hr');
	WeatherProvider.retrieveWeather.mockRestore();
});

it('check that weather is loaded whith empty description', async () => {
	jest.spyOn(WeatherProvider, 'retrieveWeather').mockImplementation(() => {
		return Promise.resolve({
			name: 'Minsk',
			temp: -5,
			tempMax: 35,
			tempMin: -25.9,
			windSpeed: 3,
			iconURL: '',
			description: '',
		});
	});
	await act(async () => {
		render(<Weather cityName="" lang="" countryCode="" />, container);
	});
	expect(container.textContent).toMatch('Current: -5°High: 35°Low: -25.9°Wind Speed: 3 mi/hr');
	WeatherProvider.retrieveWeather.mockRestore();
});

it('check that weather is not empty', async () => {
	jest.spyOn(WeatherProvider, 'retrieveWeather').mockImplementation(() => {
		return Promise.resolve({
			name: '',
			temp: 0.9,
			tempMax: 0.71,
			tempMin: -22.3,
			windSpeed: 0,
			iconURL: '',
			description: 'rain ',
		});
	});
	await act(async () => {
		render(<Weather cityName="" lang="" countryCode="" />, container);
	});
	expect(container.textContent).not.toBe('');
	WeatherProvider.retrieveWeather.mockRestore();
});

it('check that weather has lenght 59', async () => {
	jest.spyOn(WeatherProvider, 'retrieveWeather').mockImplementation(() => {
		return Promise.resolve({
			name: '',
			temp: 0.9,
			tempMax: 0.71,
			tempMin: -22.3,
			windSpeed: 0,
			iconURL: '',
			description: 'rain ',
		});
	});
	await act(async () => {
		render(<Weather cityName="" lang="" countryCode="" />, container);
	});
	expect(container.textContent).toHaveLength(59);
	WeatherProvider.retrieveWeather.mockRestore();
});
