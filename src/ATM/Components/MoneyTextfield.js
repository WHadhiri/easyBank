import React from 'react';
import clsx from 'clsx';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { BtnStyles } from './Styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		margin: theme.spacing(0)
	},
	textField: {
		marginTop: 18,
		flexBasis: 250
	}
}));

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#0c9400'
		},
		'& .MuiFormLabel-root': {
			// Field Label
			color: '#ffffff',
			fontSize: '20px'
		},
		'& .MuiInputBase-input': {
			// Field Input Text
			color: '#ffffff',
			fontSize: '20px',
			textTransform: 'capitalize'
		},
		// Field Box Attributes
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#ffffff',
				backgroundColor: 'rgba(0, 0, 0, 0.3)'
			},
			'&:hover fieldset': {
				borderColor: '#ffffff'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#0c9400'
			}
		}
	}
})(TextField);

export function Withdraw() {
	const btnstyle = BtnStyles();
	const classes = useStyles();
	const [values, setValues] = React.useState({
		withdraw: ''
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	return (
		<div>
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs>
						<CssTextField
							id="outlined-adornment-amount"
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							label="Withdraw"
							value={values.withdraw}
							onChange={handleChange('withdraw')}
							autoFocus={true}
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>
							}}
						/>
					</Grid>
					<Grid item xs>
						<Button variant="contained" color="inherit" className={btnstyle.ok} id="button">
							OK
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
export function Deposit() {
	const btnstyle = BtnStyles();
	const classes = useStyles();
	const [values, setValues] = React.useState({
		deposit: ''
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	return (
		<div>
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs>
						<CssTextField
							id="outlined-adornment-amount"
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							label="Deposit"
							value={values.deposit}
							onChange={handleChange('deposit')}
							autoFocus={true}
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>
							}}
						/>
					</Grid>
					<Grid item xs>
						<Button variant="contained" color="inherit" className={btnstyle.ok} id="button">
							OK
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
