import { useState } from 'react';
import api from '../axios/api';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
	root: {
		width: 500,
	},
	pushDown: {
		marginTop: 12,
	},
	loading: {
		marginTop: 10,
		textAlign: 'center',
	},
}));

export default function Find(props) {
	const [pokemon, usePokemon] = useState('');
	const [loading, useLoading] = useState(false);
	const [error, useError] = useState('');
	
	const classes = useStyles();

	const { onCatch } = props;

	function findPokemon() {
		useError('');

		if((pokemon || '').trim().length == 0) {
			useError('Name of the pokemon cannot be empty');
			return;
		}

		useLoading(true);

		api.get(`pokemon/${pokemon}`)
			.then(({ data }) => {
				onCatch(data);
				usePokemon('');
			}).catch(() => {
				useError('Pokemon not found, please try again');
			}).finally(() => {
				useLoading(false);
			});
	}

	function onSubmit(ev) {
		ev.preventDefault();
		findPokemon();
	}

	function onChangeField(ev) {
		usePokemon(ev.target.value);
	}

	function onClickFind() {
		findPokemon();
	}

	return (
		<form onSubmit={onSubmit} className={classes.root}>
			<Grid container spacing={24}>
				<Grid item xs={8}>
					<TextField
						onChange={onChangeField}
						value={pokemon}
						label="Type a pokemon name"
						fullWidth
					></TextField>
				</Grid>
				<Grid item xs={4}>
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={onClickFind}
						fullWidth
						className={classes.pushDown}
					>
						Find
					</Button>
				</Grid>
			</Grid>

			{
				loading && 
				<Grid container className={classes.loading}>
					<Grid item xs={12}>
						<CircularProgress />
					</Grid>
				</Grid>
			}

			{
				(error || '').length > 0 &&
				<Alert severity="error">{error}</Alert>
			}
		</form>
	)
}
