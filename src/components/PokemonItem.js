import { useContext } from "react";
import PokemonContext from "../context/PokemonContext";

function PokemonItem() {
  const { pokemon } = useContext(PokemonContext);
  return (
    <div className="container__item">
      <div className="container__item__imagen">
        <img src={pokemon.imagen} alt={pokemon.imagen} />
        <span>{pokemon.id === 0 ? "..." : "# " +pokemon.id}</span>
        <span>
          {pokemon.nombre === null ? "................." : pokemon.nombre}
        </span>
      </div>
      <div className="container__item__descripcion">
        <div>
          <strong>Types</strong>
          <span>
            {pokemon.tipos === null
              ? "..................................................."
              : pokemon.tipos}
          </span>
        </div>
        <div>
          <strong>Peso</strong>
          <span>
            {pokemon.peso === null
              ? "..................................................."
              : pokemon.peso}
          </span>
        </div>
        <div>
          <strong>Sprites</strong>
          <section>
            {pokemon.sprites && pokemon.sprites.length > 0
              ? pokemon.sprites.map((item, index) => (
                  <img src={item} alt={item} key={index} />
                ))
              : [0, 1, 2, 3].map((index) => (
                  <img
                    key={index}
                    src="http://atrilco.com/wp-content/uploads/2017/11/ef3-placeholder-image.jpg"
                    alt={index}
                  />
                ))}
          </section>
        </div>
        <div>
          <strong>Movimientos</strong>
          <span>
            {pokemon.movimientos === null
              ? "..................................................."
              : pokemon.movimientos}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PokemonItem;
