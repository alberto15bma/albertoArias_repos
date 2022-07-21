import PokemonGrid from "./PokemonGrid";
import PokemonItem from "./PokemonItem";

function ContainerPokemon() {
  return ( 
  <section className="container">
    <PokemonGrid />
    <PokemonItem />
  </section>);
}

export default ContainerPokemon;