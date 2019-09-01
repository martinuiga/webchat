import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const Footer = (props) => {
    let text = '';
    if (props.users.length > 1) {
        text = 'are typing';
    } else if (props.users.length === 1) {
        text = 'is typing';
    }

    return (
        <Grid item>
            <Typography
                variant="caption"
                align="center">
                {props.users.join(', ')} {text}
            </Typography>
        </Grid>
    );
};

export default Footer;
