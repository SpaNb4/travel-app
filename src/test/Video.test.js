import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Video from '../components/CountryGrid/Video/Video';

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

it('check video container is loaded', () => {
	const expected = '<div><div style="width: 640px; height: 360px;" /></div>';
	act(() => {
		render(<Video videoUrl="" />, container);
	});
	expect(container).toEqual(expect.not.stringContaining(expected));
});
