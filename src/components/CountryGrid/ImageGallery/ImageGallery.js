/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import Gallery from 'react-image-gallery';
import { PropTypes } from 'prop-types';
import { IMAGE_PATH } from './../../../common/constants';
import classes from './ImageGallery.module.scss';

function ImageGallery({ places, currLng }) {
	const [currIndex, setCurrIndex] = useState(0);
	const galleryRef = useRef(null);

	const images = places.map((place) => {
		return {
			original: `${IMAGE_PATH + place.imageUrl}`,
			thumbnail: `${IMAGE_PATH + place.imageUrl}`,
			description: place.description,
		};
	});

	const getImageName = (currentIndex) => {
		setCurrIndex(currentIndex);
	};

	const imageName = places[currIndex].name;

	return (
		<div className={classes.ImageGallery}>
			<h2 className={classes.PlaceName}>{imageName}</h2>
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
	currLng: PropTypes.string.isRequired,
};

export default ImageGallery;
