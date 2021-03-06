import React, { useEffect, useState } from 'react';
import { AccessTime } from '@material-ui/icons';
import PropTypes from 'prop-types';
import classes from './Timer.module.scss';
import { Typography } from '@material-ui/core';

function Timer({ timeZone, lang }) {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		let interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	let timeOptions = {
		day: 'numeric',
		weekday: 'long',
		month: 'long',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone,
	};

	return (
		<div className={classes.Timer}>
			<AccessTime fontSize="large" />
			<Typography>{date.toLocaleString(lang, timeOptions)}</Typography>
		</div>
	);
}

Timer.propTypes = {
	timeZone: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired,
};

export default Timer;
