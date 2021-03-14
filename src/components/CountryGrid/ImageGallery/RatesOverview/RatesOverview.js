import React from 'react';
import classes from './RatesOverview.module.scss';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

function RatesOverview({ rates }) {
	const [t] = useTranslation();
	let chartData = [];

	rates.forEach((elem) => {
		chartData[elem.rate] = chartData[elem.rate] + 1 || 1;
	});

	for (let i = 1; i <= 5; i++) {
		if (!chartData[i]) {
			chartData[i] = 0;
		}
	}

	chartData.reverse();

	const rate = rates && rates.reduce((prev, rate) => rate.rate + prev, 0) / rates.length;
	let starCount = 6;
	const colors = ['#4CAF50', '#2196F3', '#00bcd4', '#ff9800', '#f44336'];

	return (
		<div className={classes.RatesOverview}>
			<div className={classes.HeadingWrapper}>
				<h3 className={classes.Heading}>{t('User Rating')}</h3>
				<div className={classes.StarsWrapper}>
					{chartData.map((elem, index) => {
						if (index < rate.toFixed(0)) {
							return <span key={index} className={classes.StarChecked}></span>;
						} else {
							return <span key={index} className={classes.Star}></span>;
						}
					})}
				</div>
			</div>
			<p>
				{rate.toFixed(2)} {t('average based on')} {rates.length} {t('reviews')}.
			</p>
			<hr />
			<div className={classes.row}>
				{chartData.map((elem, index) => {
					starCount--;
					const width = ((elem / rates.length) * 100).toFixed(2);
					return (
						<div key={index} className={classes.StarLine}>
							<div className={classes.StarLineLeft}>
								{starCount} <span className={classes.StarChecked}></span>
							</div>
							<div className={classes.BarContainer}>
								<div
									className={classes.Bar}
									style={{ width: `${width}%`, backgroundColor: colors[index] }}
								></div>
							</div>
							<div className={classes.StarLineRight}>{elem}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

RatesOverview.propTypes = {
	rates: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			rate: PropTypes.number,
		})
	).isRequired,
};

export default RatesOverview;
