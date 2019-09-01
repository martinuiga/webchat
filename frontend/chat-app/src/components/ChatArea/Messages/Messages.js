import Grid from '@material-ui/core/Grid'
import _ from 'lodash';
import React from 'react';

import Message from './Message/Message';

const Messages = (props) => {
    const {chatLog} = props;
    const {owner} = props;
    const {users} = props;
    let content = [];

    _.forEach(chatLog, message => {
        console.log(chatLog);
        const user = _.find(users, {id: message.owner});
        let msg = (
            <Grid item xs={12} key={message.id}>
                <Message
                    owner={user.nickname}
                    message={message.message}
                    justify={(message.owner === owner) ? 'flex-end' : 'flex-start'}
                    color={(message.owner === owner) ? 'primary' : ''}/>
            </Grid>
        );
        content.push(msg);
    });
    return (
        <Grid item container
              direction='row-reverse'
              alignItems='flex-end'
              justify='flex-end'
              spacing={2}
              xs={12}>
            {content}
        </Grid>
    );
};

export default Messages;
