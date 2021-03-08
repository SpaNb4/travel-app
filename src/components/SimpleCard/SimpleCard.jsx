import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './SimpleCard.scss';

import { getCurrLng } from '../../store/app/slices';
import { useTranslation } from 'react-i18next';

const SimpleCard = ({ country }) => {
	const currLng = useSelector(getCurrLng);
	const [t] = useTranslation();

	return (
		<Card className="simple-card simple-card_basic">
			<img
				className="simple-card__img simple-card__img_basic"
				src={`/images/${country.imageUrl}`}
				alt="country image"
			/>
			<CardContent className="simple-card__content simple-card__content_basic">
				<Typography gutterBottom className="content__title content__title_basic">
					{country.countryName[currLng]}
				</Typography>
				<Typography gutterBottom className="content__subtitle content__subtitle_basic">
					{country.capitalName[currLng]}
				</Typography>
				<CardActions>
					<Button size="small" color="primary" variant="contained">
						{t('Learn More')}
					</Button>
				</CardActions>
			</CardContent>			
		</Card>
	);
};

SimpleCard.propTypes = {
	country: PropTypes.shape({
		countryName: PropTypes.shape({
			en: PropTypes.string,
			ru: PropTypes.string,
			de: PropTypes.string,
		}),
		capitalName: PropTypes.shape({
			en: PropTypes.string,
			ru: PropTypes.string,
			de: PropTypes.string,
		}),
		imageUrl: PropTypes.string,
		id: PropTypes.string,
	}).isRequired,
}

export default SimpleCard;
