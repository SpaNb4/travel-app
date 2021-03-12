import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
						<IconButton aria-label="display language select" color="inherit">
							<LanguageIcon />
						</IconButton>
						<div className="selectWrapper">
							<select className="select" onChange={changeLanguageHandler} value={currLng}>
								<option value="en">EN</option>
								<option value="de">DE</option>
								<option value="ru">RU</option>
							</select>
						</div>
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
