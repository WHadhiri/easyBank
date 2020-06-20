import React,{ useState} from 'react';
import clsx from 'clsx';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { BtnStyles } from './Styles';
import "react-status-alert/dist/status-alert.css";

//import StatusAlert, { StatusAlertService } from "react-status-alert";
import StatusAlert, { StatusAlertService } from "react-status-alert";

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

export function Withdraw(props) {
	const btnstyle = BtnStyles();
	const classes = useStyles();
	const [OPwithdraw, setOPwithdraw] = useState({amount :''});
	const deposit = async (e) => {
		e.preventDefault();
		
		
		try {
		 
			const response = await fetch(
				`http://localhost:5000/api/accounts/${props.account.numacc}/withdrawl`,
			  {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({
				  numacc: props.account.numacc,
				  amount: OPwithdraw.amount,
				  nameTrans: "ATM Withdrawal Tansaction",
				}),
			  }
			);
			console.log(OPwithdraw.amount);
			const data = await response.json();
			if (!response.ok) throw new Error(data.message);
			console.log(data);
			
		
		   const alertId = StatusAlertService.showSuccess(
			"Operation added Succefully!"
		  );
		 
		} catch (error) {
		  console.log(error.message);
		  const alertId = StatusAlertService.showError(error.message);
		}

	  };


	const handleChange = prop => event => {
		setOPwithdraw({ ...OPwithdraw, [prop]: event.target.value });
	};

	return (
		<>
		<StatusAlert/>
		<div>
			<form onSubmit={deposit}>
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs>
						<CssTextField
							id="outlined-adornment-amount"
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							label="Withdraw"
							value={OPwithdraw.amount}
							onChange={handleChange('amount')}
							autoFocus={true}
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>
							}}
						/>
					</Grid>
					<Grid item xs>
						<Button variant="contained" color="inherit" className={btnstyle.ok} id="button" type="submit">
							OK
						</Button>
					</Grid>
				</Grid>
			</div>
			</form>
		</div>
		</>
	);
}
export function Deposit() {
	const btnstyle = BtnStyles();
	const classes = useStyles();
	const [AM, setAM] = useState("");
	


	const handleChange = prop => event => {
		setAM({ ...AM, [prop]: event.target.value });
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
							value={AM}
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
