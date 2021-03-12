import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Search from '../Search';
import { updateCurrLng } from '../../store/app/actions';
import { getCurrLng } from '../../store/app/slices';
import './Header.scss';
import logo from '../../assets/images/travel-app-logo.jpg';

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
				<Link to="/" className="header__link link_home">
					<img alt="Travel App Logo" src={logo} className="logo__img" />
				</Link>
				<div className="header__toolbar_list">
					<Search />
					<div className="locals__container">
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
					</div>
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
			</Container>
		</AppBar>
	);
};

export default React.memo(Header);
