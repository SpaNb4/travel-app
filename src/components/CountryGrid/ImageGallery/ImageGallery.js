import React, { useState, useRef } from 'react';
import Gallery from 'react-image-gallery';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IMAGE_PATH } from './../../../common/constants';
import classes from './ImageGallery.module.scss';

function ImageGallery({ places }) {
	const [t] = useTranslation();
	const [imageName, setImageName] = useState(places[0].name.en);
	const [currIndex, setCurrIndex] = useState(0);
	const galleryRef = useRef(null);

	const images = places.map((place) => {
		return {
			original: `${IMAGE_PATH + place.imageUrl}`,
			thumbnail: `${IMAGE_PATH + place.imageUrl}`,
			description: t(place.description),
		};
	});

	const getImageName = (currentIndex) => {
		setImageName(places[currentIndex].name);
		setCurrIndex(currentIndex);
	};

	return (
		<div className={classes.ImageGallery}>
			<h2 className={classes.PlaceName}>{t(imageName)}</h2>
			<Gallery
				startIndex={currIndex}
				ref={galleryRef}
				onSlide={(currentIndex) => getImageName(currentIndex)}
				items={images}
			/>
		</div>
	);
}

ImageGallery.propTypes = {
	places: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			imageUrl: PropTypes.string,
			description: PropTypes.string,
		})
	).isRequired,
};

export default ImageGallery;
