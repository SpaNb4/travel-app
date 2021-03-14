import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export function CountryGrid() {
	const [t] = useTranslation();
	const dispatch = useDispatch();
	const currentId = useSelector(getCurrentId);
	const currLng = useSelector(getCurrLng);
	const country = useSelector(getCurrentCountry);
	const loading = useSelector(getCountryLoading);

	const modalClasses = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [isOpen, setOpen] = useState(false);

	useEffect(() => {
		if (currentId) {
			dispatch(fetchCountry(currentId, currLng));
		}
	}, [currentId, currLng]);

	const handleModalOpen = () => {
		setOpen(true);
	};

	const handleModalClose = () => {
		setOpen(false);
	};

	const overview = country && <Overview country={country} />;
	const fetchLoader = loading && <CircularProgress />;
	const loader = !country && <CircularProgress />;
	const video = country && <Video videoUrl={country.videoUrl} />;

	return (
		<Container className={classes.columnGrid}>
			<Grid container>
				{loader || fetchLoader}
				{country && window.location.href.includes(country.id) && (
					<>
						<Grid item xs={12} sm={8} className={classes.columnLeft}>
							<Container disableGutters className={classes.contentGrid}>
								<Grid container>
									{overview}
									<ImageGallery places={country.places} currLng={currLng} />
									<Button variant="contained" color="primary" onClick={handleModalOpen}>
										{t('Take Quiz')}
									</Button>
									<Modal open={isOpen} onClose={handleModalClose}>
										<div style={modalStyle} className={modalClasses.paper}>
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
									{video}
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
