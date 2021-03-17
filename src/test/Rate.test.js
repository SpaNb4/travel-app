import { getAverageRate } from '../components/CountryGrid/ImageGallery/Rate/Rate';
import { getBarWidth, getRateCount } from './../components/CountryGrid/ImageGallery/RatesOverview/RatesOverview';

test('get average rate', () => {
	expect(
		getAverageRate([
			{ name: 'Superman', rate: 5 },
			{ name: 'Wonder Woman', rate: 4 },
			{ name: 'Hulk', rate: 3 },
		])
	).toBe(4);
	expect(
		getAverageRate([
			{ name: 'Superman', rate: 2 },
			{ name: 'Wonder Woman', rate: 3 },
			{ name: 'Hulk', rate: 4 },
		])
	).toBe(3);
});

test('get rates count', () => {
	expect(
		getRateCount([
			{ name: 'Superman', rate: 5 },
			{ name: 'Wonder Woman', rate: 4 },
			{ name: 'Hulk', rate: 3 },
			{ name: 'Spider-man', rate: 3 },
			{ name: 'wolverine', rate: 2 },
		])
	).toEqual([0, 1, 2, 1, 1]);
	expect(
		getRateCount([
			{ name: 'Superman', rate: 2 },
			{ name: 'Wonder Woman', rate: 1 },
			{ name: 'Hulk', rate: 4 },
			{ name: 'Spider-man', rate: 4 },
			{ name: 'wolverine', rate: 4 },
		])
	).toEqual([1, 1, 0, 3, 0]);
});

test('get bar width', () => {
	expect(
		getBarWidth(4, [
			{ name: 'Superman', rate: 5 },
			{ name: 'Wonder Woman', rate: 4 },
			{ name: 'Hulk', rate: 3 },
			{ name: 'Spider-man', rate: 3 },
			{ name: 'wolverine', rate: 2 },
		])
	).toBeCloseTo(80);
	expect(
		getBarWidth(2, [
			{ name: 'Superman', rate: 2 },
			{ name: 'Wonder Woman', rate: 1 },
			{ name: 'Hulk', rate: 4 },
			{ name: 'Spider-man', rate: 4 },
			{ name: 'wolverine', rate: 4 },
		])
	).toBeCloseTo(40);
});
