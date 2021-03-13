import React, { useRef } from 'react';
import Gallery from 'react-image-gallery';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IMAGE_PATH } from './../../../common/constants';
import classes from './ImageGallery.module.scss';
import RateSelect from './RateSelect';
import Rate from './Rate';
function ImageGallery({ places }) {
	const refImg = useRef(null);
	const [t] = useTranslation();

	const images = places.map((place) => {
		return {
			original: `${IMAGE_PATH + place.imageUrl}`,
			thumbnail: `${IMAGE_PATH + place.imageUrl}`,
			description: t(place.description),
		};
	});

	const renderCustomControls = () => {
		return refImg.current ? (
			<div className={classes.PlaceControls}>
				<div className={classes.PlaceNameRate}>
					<h2 className={classes.PlaceName}>{t(places[refImg.current.getCurrentIndex()].name)}</h2>
					<Rate rates={places[refImg.current.getCurrentIndex()].rates} />
				</div>
				<RateSelect place={places[refImg.current.getCurrentIndex()]} />
			</div>
		) : null;
	};

	return (
		<div className={classes.ImageGallery}>
			<Gallery renderCustomControls={renderCustomControls} ref={refImg} items={images} />
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
