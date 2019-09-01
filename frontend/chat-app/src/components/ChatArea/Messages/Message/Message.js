import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import styles from './MessageStyles';

const Message = (props) => {
    const {classes} = props;

    return (
        <Grid item container direction="column" alignItems={(props.color ? 'flex-end' : 'flex-start')}
              justify={props.justify}>
            <Typography
                variant="caption">
                {props.owner}
            </Typography>
            <Paper
                className={[classes.messageBg, classes[props.color]].join(' ')}>
                <Typography
                    component="p"
                    className={classes[(props.color ? props.color : '') + 'Typ']}>
                    {props.message}</Typography>
            </Paper>
        </Grid>
    );
};

export default withStyles(styles)(Message);
