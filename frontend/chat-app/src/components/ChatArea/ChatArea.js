import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import React from 'react';
import MessageInput from '../MessageInput/MessageInput';
import styles from './ChatAreaStyles';
import Footer from './Footer/Footer';

import Header from './Header/Header';
import Messages from './Messages/Messages';

const ChatArea = (props) => {
    const {classes} = props;
    const {chatRoom} = props;
    const {chatLog} = props;
    const {typers} = props;
    const {ownerId} = props;
    const usersObj = props.users;
    let users = [];
    let room = chatRoom;
    let typingUsers = [];

    _.forEach(room.connectedUsers, user => {
        users.push(user.nickname);

        _.forEach(typers, typer => {
            if (typer.typingId === user.id && typer.typing) {
                typingUsers.push(user.nickname);
            }
        });
    });

    if (room.name === '') {
        users = [];
    }

    return (
        <Grid container
              className={classes.test}
              alignItems='stretch'
              wrap='nowrap'
              direction='column'
              spacing={2}>
            <Grid item
                  xs={12}>
                <Header
                    users={users}
                    room={room.name}
                    deal={props.deal}
                />
            </Grid>
            <Grid item
                  xs={12}>
                <Paper
                    className={[classes.messageArea, classes.paper].join(' ')}>
                    <Grid container
                          direction='column'
                          justify='flex-end'>
                        <Messages
                            chatLog={chatLog}
                            owner={ownerId}
                            users={usersObj}/>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item
                  className={classes.typingArea}
                  xs={12}>
                <Footer
                    users={typingUsers}/>
            </Grid>
            <Grid item
                  xs={12}>
                <Paper className={classes.paper}>
                    <MessageInput
                        owner={ownerId}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(ChatArea);
