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
		<Card className="simple-card">
			<Link to={`/country/${country.id}`} className="simple-card__link">
				<img
					src={buildUrl(InternalUrls.Image, country.imageUrl)}
					alt="country image"
				/>
				<CardContent className="simple-card__content">
					<Typography variant="h5" gutterBottom>
						{country.name}
					</Typography>
					<Typography gutterBottom>
						{country.capital}
					</Typography>
					<Button size="medium" color="secondary" variant="outlined">
						{t('Learn More')}
					</Button>
				</CardContent>
			</Link>
		</Card>
	);
};

SimpleCard.propTypes = {
	country: PropTypes.shape({
		name: PropTypes.string,
		capital: PropTypes.string,
		imageUrl: PropTypes.string,
		id: PropTypes.string,
	}).isRequired,
};

export default SimpleCard;
