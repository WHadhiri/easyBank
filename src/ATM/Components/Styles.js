import { makeStyles } from '@material-ui/core/styles';

export const ATMStyles = makeStyles({
	header: {
		display: 'flex',
		flexWrap: 'wrap',
		flexGrow: 1,
		width: 900,
		marginTop: 50,
		padding: 30,
		borderRadius: '15px 15px 0px 0px',
		margin: '0  auto',
		backgroundColor: 'rgba(21, 27, 31, 0.9)',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
		fontFamily: 'Roboto',
		fontSize: 25,
		fontWeight: 'bold',
		color: 'white',
		letterSpacing: 1
	},
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		flexGrow: 1,
		width: 900,
		height: 300,
		margin: '0  auto',
		padding: 30,
		paddingTop: 50,
		paddingBottom: 50,
		backgroundColor: 'rgba(27, 35, 43, 0.9)',
		fontFamily: 'Roboto',
		justifyContent: 'center',
		alignItems: 'start',
		alignContent: 'center',
		color: 'white'
	},
	contleft: {
		display: 'fllist-item block',
		flexGrow: 1,
		marginLeft: 50
	},
	contright: {
		display: 'list-item block',
		marginRight: 50
	},
	customercont: {
		marginTop: 30,
		letterSpacing: 2
	},
	customername: {
		fontSize: 45,
		fontWeight: 'bold',
		marginTop: 15
	},
	customerinfo: {
		flexGrow: 1,
		fontSize: 20,
		letterSpacing: 2
	},
	introtxt: {
		fontSize: 35,
		fontWeight: 'bold',
		maxWidth: 370,
		marginTop: 50,
		marginLeft: 30,
		color: '#ffffff6e'
	},
	textfield: {
		marginTop: 25
	},
	footer: {
		display: 'flex',
		flexWrap: 'wrap',
		flexGrow: 1,
		width: 900,
		height: 20,
		padding: 30,
		borderRadius: '0px 0px 15px 15px',
		margin: '0  auto',
		backgroundColor: 'rgba(21, 27, 31, 0.9)',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
		fontFamily: 'Roboto',
		fontSize: 25,
		fontWeight: 'bold',
		color: 'white',
		letterSpacing: 1
	}
});

export const BtnStyles = makeStyles({
	withdraw: {
		marginTop: 5,
		width: 275,
		height: 75,
		backgroundColor: '#181D21',
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fontSize: 20,
		borderRadius: 5,
		marginBottom: 20,
		letterSpacing: 3
	},
	deposit: {
		width: 275,
		height: 75,
		backgroundColor: '#181D21',
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fontSize: 20,
		borderRadius: 5,
		marginBottom: 20,
		letterSpacing: 3
	},
	transfer: {
		marginBottom: 10,
		width: 275,
		height: 75,
		backgroundColor: '#181D21',
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fontSize: 20,
		borderRadius: 5,
		letterSpacing: 3
	},
	ok: {
		width: 60,
		height: 60,
		backgroundColor: '#181D21',
		marginTop: 18
	}
});
