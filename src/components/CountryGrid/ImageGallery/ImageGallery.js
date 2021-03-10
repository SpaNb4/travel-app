/* eslint-disable no-undef */
import React from 'react';
import Gallery from 'react-image-gallery';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

function ImageGallery({ places }) {
	const [t] = useTranslation();

	const images = places.map((place) => {
		return {
			original: `${process.env.PUBLIC_URL}/images/${place.imageUrl}`,
			thumbnail: `${process.env.PUBLIC_URL}/images/${place.imageUrl}`,
			description: t(place.description.en),
		};
	});

	return <Gallery items={images} />;
}

ImageGallery.propTypes = {
	places: PropTypes.object.isRequred,
};

export default ImageGallery;
