import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropTypes } from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LocalStorageKeys, ExternalUrls } from '../../../../common/constants';

import { loginSuccess } from '../../../../store/app/actions';

const useStyles = makeStyles((theme) => ({
	submitBtn: {
		marginTop: theme.spacing(4),
	},
	status: {
		marginTop: theme.spacing(4),
	},
	success: {
		color: '#008000',
	},
	failed: {
		color: '#FF0000',
	},
	imgWrapper: {
		textAlign: 'center',
	},
	profileModal: {
		padding: '8px 24px',
	},
	profileImg: {
		borderRadius: '20px',
		marginTop: '20px',
	},
}));

function LoginForm({ isOpen, handleClose, setIsAuth, isAuth, handleLogoutClick }) {
	const dispatch = useDispatch();
	const loginStatusRef = useRef(null);
	const avatarRef = useRef(null);
	const classes = useStyles();
	const [t] = useTranslation();

	const validationSchema = yup.object({
		username: yup
			.string(t('Enter your name'))
			.min(4, t('Name should be of minimum 4 characters length'))
			.required(t('Name is required')),
		password: yup
			.string(t('Enter your password'))
			.min(8, t('Password should be of minimum 8 characters length'))
			.required(t('Password is required')),
	});

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			fetch(`${ExternalUrls.Auth}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					username: values.username,
					password: values.password,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.success) {
						dispatch(loginSuccess(res.success));
						loginStatusRef.current.innerHTML = t(`You're logged in`);
						loginStatusRef.current.classList.add(classes.success);
						loginStatusRef.current.classList.remove(classes.failed);

						localStorage.setItem('username', res.success);

						fetch(`${ExternalUrls.Auth}/getavatar`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								username: localStorage.getItem(LocalStorageKeys.Username),
							}),
						})
							.then((res) => res.json())
							.then((res) => {
								if (res.username) {
									localStorage.setItem(LocalStorageKeys.Avatar, res.username);
									setIsAuth(true);
								}
							});
					} else {
						loginStatusRef.current.innerHTML = t('Invalid name or password');
						loginStatusRef.current.classList.add(classes.failed);
						loginStatusRef.current.classList.remove(classes.success);
					}
				});
		},
	});

	return (
		<>
			<Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
				{isAuth ? (
					<div className={classes.profileModal}>
						<DialogTitle id="form-dialog-title">{t('Profile')}</DialogTitle>
						<Typography variant="h6">
							{t('You are logged in as')} {localStorage.getItem('username')}
						</Typography>
						<div className={classes.imgWrapper}>
							<img
								className={classes.profileImg}
								ref={avatarRef}
								height="70"
								src={localStorage.getItem('avatar')}
							/>
						</div>
						<Box textAlign="center">
							<Button
								onClick={handleLogoutClick}
								className={classes.submitBtn}
								color="primary"
								variant="contained"
								type="submit"
							>
								{t('Logout')}
							</Button>
						</Box>
					</div>
				) : (
					<>
						<DialogTitle id="form-dialog-title">{t('Login Form')}</DialogTitle>
						<DialogContent>
							<form onSubmit={formik.handleSubmit}>
								<TextField
									fullWidth
									id="username"
									name="username"
									label={t('Name')}
									value={formik.values.username}
									onChange={formik.handleChange}
									error={formik.touched.username && Boolean(formik.errors.username)}
									helperText={formik.touched.username && formik.errors.username}
								/>
								<TextField
									fullWidth
									id="password"
									name="password"
									label={t('Password')}
									type="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
								/>

								<div ref={loginStatusRef} className={classes.status}></div>

								<Button className={classes.submitBtn} color="primary" variant="contained" type="submit">
									{t('Login')}
								</Button>
							</form>
						</DialogContent>
					</>
				)}
			</Dialog>
		</>
	);
}

LoginForm.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	setIsAuth: PropTypes.func.isRequired,
	isAuth: PropTypes.bool.isRequired,
	handleLogoutClick: PropTypes.func.isRequired,
};

export default LoginForm;
