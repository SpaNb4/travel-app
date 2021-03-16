import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './SimpleCard.scss';
import { buildUrl } from '../../common/helpers';
import { InternalUrls } from '../../common/constants';

import { useTranslation } from 'react-i18next';

const SimpleCard = ({ country }) => {
	const [t] = useTranslation();

	return (
		<Link to={`/country/${country.id}`} className="link_simple-card">
			<Card className="simple-card simple-card_basic">
				<img
					className="simple-card__img simple-card__img_basic"
					src={buildUrl(InternalUrls.Image, country.imageUrl)}
					alt="country image"
				/>
				<CardContent className="simple-card__content simple-card__content_basic">
					<Typography gutterBottom className="content__title content__title_basic">
						{country.name}
					</Typography>
					<Typography gutterBottom className="content__subtitle content__subtitle_basic">
						{country.capital}
					</Typography>
					<Button size="medium" color="primary" variant="contained">
						{t('Learn More')}
					</Button>
				</CardContent>			
			</Card>
		</Link>
	);
};

SimpleCard.propTypes = {
	country: PropTypes.shape({
		name: PropTypes.string,
		capital: PropTypes.string,
		imageUrl: PropTypes.string,
		id: PropTypes.string,
	}).isRequired,
}

export default SimpleCard;
