export const styles = theme => ({
	messageBg: {
		...theme.mixins.gutters(),
		paddingTop: 5,
		paddingBottom: 5,
	},
	primary: {
		background: theme.palette.primary.main
	},
	primaryTyp: {
		color: theme.palette.getContrastText(theme.palette.primary.main)
	}
});

export default styles