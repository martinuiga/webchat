const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: 2,
        paddingBottom: 2,
    },
    messageArea: {
        height: '70vh',
        overflowY: 'scroll',
    },
    typingArea: {
        height: 5
    }
});

export default styles;
