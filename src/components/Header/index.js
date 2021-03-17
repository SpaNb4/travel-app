import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
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
import RegisterForm from './AuthForm/RegisterForm/RegisterForm';
import LoginForm from './AuthForm/LoginForm/LoginForm';
import { LocalStorageKeys, ExternalUrls } from '../../common/constants';
import logo from '../../assets/images/travel-app-logo-v2.png';
import './Header.scss';

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
	roundButton: {
		margin: '0 10px',
	},
	button: {
		color: theme.palette.text.secondary,
	},
	desktopSearch: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	PopupMenu: {
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
}));

const Header = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const currLng = useSelector(getCurrLng);
	const [searchValue, setSearchValue] = useState('');
	const [t] = useTranslation();

	const [path, setPath] = useState(pathname);
	const [isAuth, setIsAuth] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const show = path === '/';

	useEffect(() => {
		if (localStorage.getItem(LocalStorageKeys.Username)) {
			setIsAuth(true);
		}
	}, []);

	useEffect(() => {
		i18n.changeLanguage(currLng);
	}, [currLng]);

	useEffect(() => {
		setPath(pathname);
	}, [pathname]);

	function changeLanguageHandler(event) {
		localStorage.setItem(LocalStorageKeys.Language, event.target.value);
		dispatch(updateCurrLng(event.target.value));
	}

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
		fetch(`${ExternalUrls.Auth}/logout`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				if (res) {
					setIsAuth(false);
					localStorage.removeItem(LocalStorageKeys.Username);
					localStorage.removeItem(LocalStorageKeys.Avatar);
					dispatch(logout());
				}
			});
	}

	function handleMobileMenuOpen(evt) {
		setMobileMoreAnchorEl(evt.currentTarget);
	}

	function handleMobileMenuClose() {
		setMobileMoreAnchorEl(null);
	}

	const renderMobileMenu = (
		<Menu
			className={classes.PopupMenu}
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{show && (
				<MenuItem onKeyDown={(e) => e.stopPropagation()}>
					<Search searchValue={searchValue} setSearchValue={setSearchValue} />
				</MenuItem>
			)}

			{!isAuth && (
				<MenuItem onClick={handleRegisterOpen} className={classes.button}>
					{t('Sign up')}
				</MenuItem>
			)}

			<MenuItem onClick={handleLoginOpen} className={classes.button}>
				{isAuth ? t('Profile') : t('Login')}
			</MenuItem>
		</Menu>
	);

	const renderDesktopMenu = (
		<ul className={classes.desktopMenu}>
			{show && <Search searchValue={searchValue} setSearchValue={setSearchValue} />}
			{!isAuth && (
				<IconButton
					onClick={handleRegisterOpen}
					aria-controls="register-button"
					aria-haspopup="true"
					className={classes.roundButton}
				>
					<PersonAddIcon />
				</IconButton>
			)}
			<IconButton
				onClick={handleLoginOpen}
				aria-controls="login-button"
				aria-haspopup="true"
				className={classes.roundButton}
			>
				<AccountCircleIcon />
			</IconButton>
		</ul>
	);

	return (
		<AppBar position="sticky" className="header" color="inherit">
			<Toolbar className="header__wrapper">
				<Link to="/">
					<img alt="Travel App Logo" src={logo} />
				</Link>

				<div className="lang">
					<select className="lang__select" onChange={changeLanguageHandler} value={currLng}>
						<option value="en">EN</option>
						<option value="de">DE</option>
						<option value="ru">RU</option>
					</select>
				</div>

				<IconButton
					aria-label="show more"
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
					className={classes.mobileMenuTrigger}
				>
					<MoreIcon />
				</IconButton>

				{renderMobileMenu}
				{renderDesktopMenu}
			</Toolbar>

			<RegisterForm isOpen={isRegisterOpen} handleClose={handleRegisterClose} />

			<LoginForm
				isOpen={isLoginOpen}
				handleClose={handleLoginClose}
				setIsAuth={setIsAuth}
				isAuth={isAuth}
				handleLogoutClick={handleLogoutClick}
			/>
		</AppBar>
	);
};

export default React.memo(Header);
