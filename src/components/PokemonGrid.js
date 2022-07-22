import { useContext } from "react";
import PokemonContext from "../context/PokemonContext";

function PokemonGrid() {
  const { pokemons, arrayColores, buscarPokemon, cargando } = useContext(PokemonContext);
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
      ) : cargando === true ? (
        <strong className="container__grid__validacion">Cargando...</strong>
      ) : (
        <strong className="container__grid__validacion">
          No se encontró el pokemon
        </strong>
      )}
    </section>
  );
}

export default PokemonGrid;
