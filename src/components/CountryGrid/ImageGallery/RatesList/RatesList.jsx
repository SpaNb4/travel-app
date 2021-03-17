import * as React from 'react';
import { PropTypes } from 'prop-types';
import StarsIcon from '@material-ui/icons/Stars';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import './RatesList.scss';

const useStyles = makeStyles({
	root: {
		padding: '10px 30px',
	},
	emptyCell: {
		border: 'none',
	},
});

const RatesList = ({ rates }) => {
	const classes = useStyles();
	const [t] = useTranslation();

	const items =
		rates &&
		rates.map((obj, index) => (
			<TableRow key={index}>
				<TableCell>{obj.name}</TableCell>
				<TableCell>
					<StarsIcon color="secondary" />
				</TableCell>
				<TableCell>{obj.rate}</TableCell>
			</TableRow>
		));

	return (
		<TableContainer component={Paper} className={classes.root}>
			<Table size="small" aria-label="rates table">
				<TableBody>
					{items || (
						<TableRow>
							<TableCell className={classes.emptyCell}>{t('No rates yet')}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

RatesList.propTypes = {
	rates: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			rate: PropTypes.number,
		})
	).isRequired,
};

export default RatesList;
