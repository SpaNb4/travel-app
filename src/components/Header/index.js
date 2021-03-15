import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreIcon from '@material-ui/icons/MoreVert';

import { makeStyles } from '@material-ui/core/styles';
import Search from '../Search';
import { updateCurrLng, logout } from '../../store/app/actions';
import { getCurrLng } from '../../store/app/slices';
import './Header.scss';
import RegisterForm from './AuthForm/RegisterForm/RegisterForm';
import LoginForm from './AuthForm/LoginForm/LoginForm';
import { AUTH_URL } from './../../common/constants';
import logo from '../../assets/images/travel-app-logo-v2.png';

const useStyles = makeStyles((theme) => ({
	desktopMenu: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	mobileMenuTrigger: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
}));

const UserBar = () => {
	const dispatch = useDispatch();
	const [isAuth, setIsAuth] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('username')) {
			setIsAuth(true);
		}
	}, []);

	function handleRegisterOpen() {
		setIsRegisterOpen(true);
	}

	function handleRegisterClose() {
		setIsRegisterOpen(false);
	}

	function handleLoginOpen() {
		setIsLoginOpen(true);
	}

	function handleLoginClose() {
		setIsLoginOpen(false);
	}

	function handleLogoutClick() {
		fetch(`${AUTH_URL}/logout`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				if (res) {
					setIsAuth(false);
					localStorage.removeItem('username');
					localStorage.removeItem('avatar');
					dispatch(logout());
				}
			});
	}
	return (
		<>
			{!isAuth && (
				<MenuItem>
					<IconButton
						onClick={handleRegisterOpen}
						aria-controls="register-button"
						aria-haspopup="true"
						variant="outlined"
					>
						<PersonAddIcon />
					</IconButton>
				</MenuItem>
			)}
			<MenuItem>
				<IconButton
					onClick={handleLoginOpen}
					aria-controls="login-button"
					aria-haspopup="true"
					variant="outlined"
				>
					<AccountCircleIcon />
				</IconButton>
			</MenuItem>

			<RegisterForm isOpen={isRegisterOpen} handleClose={handleRegisterClose} />
			<LoginForm
				isOpen={isLoginOpen}
				handleClose={handleLoginClose}
				setIsAuth={setIsAuth}
				isAuth={isAuth}
				handleLogoutClick={handleLogoutClick}
			/>
		</>
	);
};

const Header = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const currLng = useSelector(getCurrLng);

	useEffect(() => {
		i18n.changeLanguage(currLng);
	}, [currLng]);

	function changeLanguageHandler(event) {
		localStorage.setItem('lng', event.target.value);
		dispatch(updateCurrLng(event.target.value));
	}

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	return (
		<AppBar position="static" className="header">
			<Toolbar>
				<Link to="/" className="header__home">
					<img alt="Travel App Logo" src={logo} />
				</Link>

				<Search />

				<ul className={classes.desktopMenu}>
					<UserBar />
				</ul>

				<IconButton
					aria-label="show more"
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
					className={classes.mobileMenuTrigger}
					variant="outlined"
				>
					<MoreIcon />
				</IconButton>

				<Menu
					anchorEl={mobileMoreAnchorEl}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={isMobileMenuOpen}
					onClose={handleMobileMenuClose}
				>
					<UserBar />
				</Menu>

				<div className="lang">
					<select className="lang__select" onChange={changeLanguageHandler} value={currLng}>
						<option value="en">EN</option>
						<option value="de">DE</option>
						<option value="ru">RU</option>
					</select>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default React.memo(Header);
