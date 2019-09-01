import Grid from '@material-ui/core/Grid/Grid';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ChatArea from '../../components/ChatArea/ChatArea';
import Modal from '../../components/Modal/Modal';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './LayoutStyles';
import { compose } from 'redux';

class Layout extends Component {
    state = {
        nickname: '',
        error: false,
    };

    handleModalSubmit = () => {
        if (this.state.nickname !== '') {
            this.setState({error: false});
            this.props.setNickname(this.state.nickname.toLowerCase());
            this.props.initialize(this.state.nickname.toLowerCase());
        } else {
            this.setState({error: true});
        }
    };

    handleModalInputChange = (event) => {
        this.setState({nickname: event.target.value});
    };

    render() {
        let content = '';
        const {classes} = this.props;

        if (this.props.nickname !== '' && !this.props.modalOpen && !this.props.nickInUse) {
            content = (
                <Grid container>
                    <Grid
                        item
                        xs={12}>
                        <ChatArea
                            chatRoom={this.props.chatRoom}
                            chatLog={this.props.chatLog}
                            users={this.props.users}
                            typers={this.props.typers}
                            ownerId={this.props.ownerId}
                            nickname={this.props.nickname}
                        />
                    </Grid>
                </Grid>
            )
        }
        return (
            <Fragment>
                <Modal
                    open={this.props.modalOpen}
                    submit={this.handleModalSubmit}
                    change={this.handleModalInputChange}
                    text="Enter Your Nickname"
                    label="Nickname"
                    errorMessage={this.props.nickInUse ? 'Nickname is in use' : ''}
                    error={this.state.error || this.props.nickInUse}/>
                <div className={classes.root}>
                    {content}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nickname: state.user.nickname,
        chatRoom: state.socket.chatRoom,
        nickInUse: state.socket.nickInUse,
        modalOpen: state.socket.modalOpen,
        serverError: state.socket.serverError,
        chatLog: state.socket.chatLog,
        users: state.socket.users,
        typers: state.socket.typers,
        ownerId: state.socket.ownerId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initialize: (nickname) => {
            dispatch(actions.initialize(nickname))
        },
        setNickname: (nickname) => {
            dispatch(actions.setNickname(nickname))
        }
    }
};

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Layout);