import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Map from './Map/Map';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCurrLng } from '../../store/app/slices';
import { getCountryLoading, getCurrentCountry, getCurrentId } from '../../store/country/slices';
import { fetchCountry } from '../../store/country/actions';
import Overview from '../Overview/';
import ImageGallery from './ImageGallery/ImageGallery';
import Widgets from '../Widgets/Widgets';
import Video from './Video/Video';
import Quiz from '../Quiz';
import classes from './CountryGrid.module.scss';
import { useTranslation } from 'react-i18next';

export function CountryGrid() {
	const [t] = useTranslation();
	const dispatch = useDispatch();
	const currentId = useSelector(getCurrentId);
	const currLng = useSelector(getCurrLng);
	const country = useSelector(getCurrentCountry);
	const loading = useSelector(getCountryLoading);
	const [isOpen, setOpen] = useState(false);

	useEffect(() => {
		if (currentId) {
			dispatch(fetchCountry(currentId, currLng));
		}
	}, [currentId, currLng]);

	const openModalWindow = () => {
		setOpen(true);
	};

	const closeModalWindow = () => {
		setOpen(false);
	};

	return (
		<Container className={classes.columnGrid}>
			<Grid container>
				{(!country || loading) && <CircularProgress />}
				{country && window.location.href.includes(country.id) && (
					<>
						<Grid item xs={12} sm={8} className={classes.columnLeft}>
							<Container disableGutters className={classes.contentGrid}>
								<Grid container>
									{country && <Overview country={country} />}
									<ImageGallery places={country.places} currLng={currLng} />
									<Button variant="contained" color="primary" onClick={openModalWindow}>
										{t('Take Quiz')}
									</Button>
									<Modal open={isOpen} onClose={closeModalWindow} className="quiz-modal">
										<div className="quiz-paper">
											<Quiz />
										</div>
									</Modal>
								</Grid>
							</Container>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.columnRight}>
							<Container disableGutters className={classes.contentGrid}>
								<Grid container>
									<Map countryID={country.ISOCode} />
									<Widgets country={country} />
									{country && <Video videoUrl={country.videoUrl} />}
								</Grid>
							</Container>
						</Grid>
					</>
				)}
			</Grid>
		</Container>
	);
}

export default CountryGrid;
