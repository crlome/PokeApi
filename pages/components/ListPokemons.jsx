import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	spaceTop: {
		marginTop: 10,
	},
	root: {
		display: 'flex',
		marginBottom: 10,
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		width: 300,
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 150,
	},
}));

export default function List(props) {
	const { pokemons } = props;
	
	const classes = useStyles();

	return (
		<div>
			{
				(pokemons || []).length == 0 && 
				<Typography className={classes.spaceTop} variant="h6" component="h6">
					No Pokemons captured yet
				</Typography>
			}
			
			{
				(pokemons || []).length > 0 && (pokemons || []).map(pokemon => {
					return (
						<Card className={classes.root}>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<Typography component="h5" variant="h5">
										{pokemon.name}
									</Typography>
									<Typography variant="subtitle1" color="textSecondary">
										ID: {pokemon.id}
									</Typography>
								</CardContent>
							</div>
							<CardMedia
								className={classes.cover}
								image={(pokemon.sprites || {}).front_default}
								title={pokemon.name}
							/>
						</Card>
					)
				})
			}
		</div>
	)
}
