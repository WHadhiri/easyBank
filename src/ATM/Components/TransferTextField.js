import React from 'react';
import clsx from 'clsx';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { BtnStyles } from './Styles';
import SendIcon from '@material-ui/icons/Send';

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

export default function Transfer() {
	const btnstyle = BtnStyles();
	const classes = useStyles();
	const [values, setValues] = React.useState({
		name: ''
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
							id="outlined-adornment-name"
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							label="Recipient"
							value={values.amount}
							onChange={handleChange('name')}
							autoFocus={true}
						/>
					</Grid>
					<Grid item xs>
						<Button variant="contained" color="inherit" className={btnstyle.ok} id="button">
							<SendIcon />
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
