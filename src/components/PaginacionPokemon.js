import { useContext } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import PokemonContext from "../context/PokemonContext";

function PaginacionPokemon() {
  const { next, previous, nextPokemons, previousPokemons } =
    useContext(PokemonContext);
  const previousBoton = previous === null ? "disabled__boton" : "";
  const nextBoton     = next === null ? "disabled__boton" : "";
  return (
    <section className="paginacion__container">
      <button onClick={previousPokemons} className={previousBoton}>
        <AiOutlineLeft />
         Atrás
      </button>
      <button onClick={nextPokemons} className={nextBoton}>
        Siguiente
        <AiOutlineRight />
      </button>
    </section>
  );
}

export default PaginacionPokemon;