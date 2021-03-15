import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Footer from '../components/Footer';

const currentYear = new Date().getFullYear();
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

it('check if correct data in component', () => {
	const expected = currentYear;

	act(() => {
		render(<Footer />, container);
	});

	expect(container.querySelector('.footer__date').textContent).toContain(expected);
});
