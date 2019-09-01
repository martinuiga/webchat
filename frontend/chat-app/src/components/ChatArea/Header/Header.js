import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const Header = (props) => (
    <AppBar
        position="static"
        color="inherit">
        <Toolbar>
            <Grid item xs={10}>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                    noWrap={true}>
                    {props.users.join(', ')} in {props.room}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography align={'right'}>
                    <Button onClick={props.deal}
                            variant="contained">
                        Create deal
                    </Button>
                </Typography>
            </Grid>
        </Toolbar>
    </AppBar>
);

export default Header;
