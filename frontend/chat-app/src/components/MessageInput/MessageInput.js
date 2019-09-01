import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Textfield from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isTyping, sendMessage, createPipedriveDeal } from '../../store/actions/chat';
import styles from './MessageInputStyles';


class MessageInput extends Component {
    state = {
        input: ''
    };

    handleTextFieldChange = (e) => {
        this.setState({
            input: e.target.value
        });

        if (e.target.value) {
            this.props.isTyping(this.props.nickname, this.props.id, true);
        } else {
            this.props.isTyping(this.props.nickname, this.props.id, false);
        }
    };

    handleOnClick = (message, nickname, userId) => {
        this.props.sendMessage(message, nickname, userId);
        this.setState({
            input: ''
        });
        this.props.isTyping(this.props.nickname, this.props.id, false);
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Textfield onChange={this.handleTextFieldChange}
                           multiline={true}
                           placeholder="Input..."
                           value={this.state.input}
                           className={classes.inputField}
                           InputProps={{disableUnderline: true}}
                />
                <Button className={classes.sendButton}
                        variant="contained"
                        color="primary" onClick={() => this.handleOnClick(this.state.input, this.props.nickname, this.props.ownerId)}>
                    Send
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nickname: state.user.nickname,
        id: state.user.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message, nickname, id) => {
            dispatch(sendMessage(message, nickname, id))
        },
        isTyping: (nickname, id, typing) => {
            dispatch(isTyping(nickname, id, typing))
        },
        createPipedriveDeal: () => {
            dispatch(createPipedriveDeal())
        }
    }
};

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ))(MessageInput);
