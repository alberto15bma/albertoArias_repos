import CabeceraPokemon from "./components/CabeceraPokemon";
import ContainerPokemon from "./components/ContainerPokemon";
import PaginacionPokemon from "./components/PaginacionPokemon";
import { PokemonProvider } from "./context/PokemonContext";

function App() {
  return (
    <div className="App">
      <main>
          <PokemonProvider>
            <CabeceraPokemon />
            <ContainerPokemon />
            <PaginacionPokemon />
          </PokemonProvider>
      </main>
    </div>
  );
}

export default App;
