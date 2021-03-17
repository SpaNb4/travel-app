import React from 'react';
import Grid from '@material-ui/core/Grid';

import SimpleCard from '../../SimpleCard';

const GridItem = (props) => (
	<Grid item xs={12} sm={6}>
		<SimpleCard {...props} />
	</Grid>
);

export default React.memo(GridItem);
