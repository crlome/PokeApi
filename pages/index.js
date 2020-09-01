import { useState } from 'react';
import styles from '../styles/Home.module.css'
import FindPokemon from './components/FindPokemon';
import ListPokemons from './components/ListPokemons';

export default function Home() {
	const [pokemons, usePokemons] = useState([]);

	function onCatch(pokemon) {
		const _pokemons = [ ...pokemons ];

		_pokemons.push(pokemon);

		usePokemons(_pokemons);
	}

	return (
		<div className={styles.container}>
			<FindPokemon onCatch={onCatch}/>

			<ListPokemons pokemons={pokemons}/>
		</div>
	)
}
