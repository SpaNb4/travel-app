/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import Gallery from 'react-image-gallery';
import { PropTypes } from 'prop-types';
import { InternalUrls } from '../../../common/constants';
import classes from './ImageGallery.module.scss';
import RateSelect from './RateSelect';
import Rate from './Rate';
import RatesList from './RatesList';
import RatesOverview from './RatesOverview/RatesOverview';

function ImageGallery({ places }) {
	const [currIndex, setCurrIndex] = useState(0);
	const galleryRef = useRef(null);

	const images = places.map((place) => {
		return {
			original: `${InternalUrls.Image + place.imageUrl}`,
			thumbnail: `${InternalUrls.Image + place.imageUrl}`,
			description: place.description,
		};
	});

	const getImageName = (currentIndex) => {
		setCurrIndex(currentIndex);
	};

	const imageName = places[currIndex].name;
	const rates = places[currIndex].rates;
	const place = places[currIndex];

	return (
		<div className={classes.ImageGallery}>
			<div className={classes.PlaceControls}>
				<div className={classes.PlaceNameRate}>
					<h3 className={classes.PlaceName}>{imageName}</h3>
					<Rate rates={rates} />
				</div>
				<RateSelect place={place} />
			</div>
			<Gallery
				startIndex={currIndex}
				ref={galleryRef}
				onSlide={(currentIndex) => getImageName(currentIndex)}
				items={images}
			/>
			<RatesList rates={rates} />
			<RatesOverview rates={rates} />
		</div>
	);
}

ImageGallery.propTypes = {
	places: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			imageUrl: PropTypes.string,
			description: PropTypes.string,
			rates: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string,
					rate: PropTypes.number,
				})
			),
		})
	).isRequired,
};

export default ImageGallery;
