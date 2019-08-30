import Modal from '@material-ui/core/Modal/Modal';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        nickname: '',
        error: false,
    };

    render() {
        return (
            <Fragment>
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
        snackOpen: state.socket.snackOpen,
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
        },
        closeSnack: () => {
            dispatch(actions.closeSnack())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Layout);
