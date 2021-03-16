import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropTypes } from 'prop-types';
import { Input, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ExternalUrls } from '../../../../common/constants';

import { registerSuccess } from '../../../../store/app/actions';

const useStyles = makeStyles((theme) => ({
	submitBtn: {
		marginTop: theme.spacing(4),
	},
	fileInput: {
		marginTop: theme.spacing(2),
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
}));

function RegisterForm({ isOpen, handleClose }) {
	const dispatch = useDispatch();
	const registerStatusRef = useRef(null);
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
			photo: null,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			let formData = new FormData();

			formData.append('username', values.username);
			formData.append('password', values.password);
			formData.append('profileImage', values.photo);

			fetch(`${ExternalUrls.Auth}/register`, { method: 'POST', body: formData }).then((res) => {
				if (res.ok) {
					dispatch(registerSuccess(formData.username));
					registerStatusRef.current.innerHTML = t(`You have successfully registered`);
					registerStatusRef.current.classList.add(classes.success);
					registerStatusRef.current.classList.remove(classes.failed);
				} else {
					registerStatusRef.current.innerHTML = t('User already exists or bad image has been uploaded');
					registerStatusRef.current.classList.add(classes.failed);
					registerStatusRef.current.classList.remove(classes.success);
				}
			});
		},
	});

	return (
		<>
			<Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">{t('Register Form')}</DialogTitle>
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

						<Input
							className={classes.fileInput}
							accept="image/*"
							id="contained-button-file"
							type="file"
							onChange={(event) => {
								formik.setFieldValue('photo', event.currentTarget.files[0]);
							}}
							required
						/>

						<div ref={registerStatusRef} className={classes.status}></div>

						<Button m={2} className={classes.submitBtn} color="primary" variant="contained" type="submit">
							{t('Register')}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}

RegisterForm.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default RegisterForm;
