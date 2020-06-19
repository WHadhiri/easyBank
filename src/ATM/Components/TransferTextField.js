import React from 'react';
import clsx from 'clsx';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { BtnStyles } from './Styles';
import SendIcon from '@material-ui/icons/Send';
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

export default function Transfer(props) {
	const btnstyle = BtnStyles();
	const classes = useStyles();
	const [numaccDis, setnumaccDis] = React.useState("");
	const [test, settest] = React.useState(0);

	const [transfer, settransfer] = React.useState({
		amount: '',
		numaccDis:''
	});

	const OPtransfer = async (e) => {
		e.preventDefault();
		try {
		 
			const response = await fetch(
				`http://localhost:5000/api/accounts/${props.account.numacc}/transfer`,
				{
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify({
					numacc: props.account.numacc,
					amount: transfer.amount,
					numaccDis: transfer.numaccDis,
					nameTrans: "ATM Transfer Transaction",
				  }),
				}
			  );
			  const data = await response.json();
			  if (!response.ok) throw new Error(data.message);
			  console.log(data);
			  const alertId = StatusAlertService.showSuccess(
				"Operation added Succefully!")
		 
		} catch (error) {
		  console.log(error.message);
		  const alertId = StatusAlertService.showError(error.message);
		 
		}
	  };

	const handleChange = prop => event => {
		settransfer({ ...transfer, [prop]: event.target.value });
	
	};

	const change =() =>{settest(1)};
if (test == 0){
	return (

		<div>
			
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs>
						<CssTextField
							id="outlined-adornment-name"
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							label="Amount"
							value={transfer.amount}
							onChange={handleChange('amount')}
							autoFocus={true}
						/>
					</Grid>
					<Grid item xs>
						<Button variant="contained" color="inherit" className={btnstyle.ok} id="button" onClick={change}>
							<SendIcon />
						</Button>
					</Grid>
				</Grid>
			</div>
			
		</div>
	);}else if(test == 1){
	return (

		<div>
			<form onSubmit={OPtransfer}>
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs>
						<CssTextField
							id="outlined-adornment-name"
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							label="Recipient"
							value={transfer.numaccDis}
							onChange={handleChange('numaccDis')}
							autoFocus={true}
						/>
					</Grid>
					<Grid item xs>
						<Button variant="contained" color="inherit" className={btnstyle.ok} id="button" type="submit" >
							<SendIcon />
						</Button>
					</Grid>
				</Grid>
			</div>
			</form>
		</div>
	);
}
}
