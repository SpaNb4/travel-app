import React, { useState } from 'react';
import i18n from 'i18next';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { MenuItem, Select } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExchangeRates from '../Widgets/ExchangeRates/ExchangeRates';
import Timer from '../Widgets/Timer/Timer';
import Search from '../Search';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	logoButton: {
		marginRight: theme.spacing(2),
	},
}));

const Header = () => {
	const [isLngOpen, setIsLngOpen] = useState(false);
	const [currLng, setCurrLng] = useState(localStorage.getItem('lng') || 'en');
	const classes = useStyles();
	const auth = true;

	function changeLanguageHandler(event) {
		setCurrLng(event.target.value);
		i18n.changeLanguage(event.target.value);
		localStorage.setItem('lng', event.target.value);
	}

	function handleLngClose() {
		setIsLngOpen(false);
	}

	function handleLngOpen() {
		setIsLngOpen(true);
	}

	return (
		<AppBar position="static">
			<Container>
				<Toolbar>
					<Link href="#" color="inherit">
						<TagFacesIcon />
					</Link>

					<Search />

					<div className={classes.grow} />

					<IconButton onClick={handleLngOpen} aria-label="display language select" color="inherit">
						<LanguageIcon />
					</IconButton>
					<Select
						id="select"
						open={isLngOpen}
						onChange={changeLanguageHandler}
						onClose={handleLngClose}
						onOpen={handleLngOpen}
						value={currLng}
					>
						<MenuItem value="en">EN</MenuItem>
						<MenuItem value="de">DE</MenuItem>
						<MenuItem value="ru">RU</MenuItem>
					</Select>

					{auth && (
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							color="inherit"
						>
							<AccountCircleIcon />
						</IconButton>
					)}
				</Toolbar>
				<ExchangeRates currency={'EUR'} />
				<Timer timeZone={'Europe/Kiev'} lang={currLng} />
			</Container>
		</AppBar>
	);
};

export default Header;
