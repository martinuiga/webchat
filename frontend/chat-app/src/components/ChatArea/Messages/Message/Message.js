import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from './MessageStyles';

const Message = (props) => {
	const { classes } = props;

	return (
		<Grid item container direction="column" alignItems={(props.color ? "flex-end" : "flex-start")}
			justify={props.justify}>
			<Typography
				variant="caption">
				{props.owner}
			</Typography>
			<Paper
				className={[classes.messageBg, classes[props.color]].join(" ")}>
				<Typography
					component="p"
					className={classes[(props.color ? props.color : "") + "Typ"]}>
					{props.message}</Typography>
			</Paper>
		</Grid>
	);
};

export default withStyles(styles)(Message);
