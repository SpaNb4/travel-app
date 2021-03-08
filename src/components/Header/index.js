import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
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
import './Header.scss';

import * as constants from '../../common/constants';
import { updateCurrLng } from '../../store/app/actions';
import { getCurrLng } from '../../store/app/slices';

const Header = () => {
	const dispatch = useDispatch();
	const [isLngOpen, setIsLngOpen] = useState(false);
	const currLng = useSelector(getCurrLng);
	const auth = true;

	useEffect(() => {
		i18n.changeLanguage(currLng);
	}, [currLng]);

	function changeLanguageHandler(event) {
		localStorage.setItem('lng', event.target.value);
		dispatch(updateCurrLng(event.target.value));
	}

	function handleLngClose() {
		setIsLngOpen(false);
	}

	function handleLngOpen() {
		setIsLngOpen(true);
	}

	return (
		<AppBar position="static" className="header">
			<Container className="header__container">
				<Toolbar className="header__toolbar">
					<Link href="#" color="inherit">
						<TagFacesIcon />
					</Link>

					<Search />

					<div className="header__toolbar_aside">
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
					</div>
				</Toolbar>
				<ExchangeRates currency={constants.DEFAULT_CURRENCY} />
				<Timer timeZone={constants.DEFAULT_TIMEZONE} lang={currLng} />
			</Container>
		</AppBar>
	);
};

export default React.memo(Header);
