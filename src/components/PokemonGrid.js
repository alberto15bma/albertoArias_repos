import { useContext } from "react";
import PokemonContext from "../context/PokemonContext";

function PokemonGrid() {
  const { pokemons, arrayColores, buscarPokemon } = useContext(PokemonContext);
  return (
    <section className="container__grid">
      {pokemons && pokemons.length > 0 ? (
        pokemons.map((pokemon, index) => (
          <div
            key={pokemon.id}
            onClick={() => buscarPokemon(pokemon.url)}
            className={arrayColores[index]}
          >
            <img src={pokemon.imagen} alt={pokemon.nombre} />
            <span># {pokemon.id}</span>
            <strong>{pokemon.nombre}</strong>
          </div>
        ))
      ) : (
        <strong>Cargando...</strong>
      )}
    </section>
  );
}

export default PokemonGrid;
