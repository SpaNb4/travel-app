import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Search from '../Search';
import { updateCurrLng } from '../../store/app/actions';
import { getCurrLng } from '../../store/app/slices';
import './Header.scss';
import RegisterForm from './AuthForm/RegisterForm/RegisterForm';
import LoginForm from './AuthForm/LoginForm/LoginForm';
import { AUTH_URL } from './../../common/constants';
import { PersonAdd } from '@material-ui/icons';

const Header = () => {
	const dispatch = useDispatch();
	const [isLngOpen, setIsLngOpen] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const currLng = useSelector(getCurrLng);
	const [isAuth, setIsAuth] = useState(false);

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
				}
			});
	}

	return (
		<AppBar position="static" className="header">
			<Container className="header__container">
				<Toolbar className="header__toolbar">
					<Link to="/">
						<HomeIcon fontSize="large" />
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
						<div>
							<IconButton
								onClick={handleRegisterOpen}
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
							>
								<PersonAdd />
							</IconButton>
							<IconButton
								onClick={handleLoginOpen}
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
							>
								<AccountCircleIcon />
							</IconButton>
						</div>
					</div>
				</Toolbar>
			</Container>
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
