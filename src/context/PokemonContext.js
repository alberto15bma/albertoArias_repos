import { createContext, useEffect, useState } from "react";
import { getPokemon, getPokomons } from "../services/PokemonService";
import pokk from "../models/pokemon";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState(pokk);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    useEffect(() => {
      cargarPokemons(null);
    }, []);

    const arrayColores = ["color1", "color2", "color3", "color4"];

    const cargarPokemons = async (url) => {
      try {
        const data = await getPokomons(url);
        const { results, next, previous } = data;
        let arrayPokemons = await Promise.all(
          results.map(async (result) => {
            let res = await getPokemon(result.url);
            return {
              id: res.id,
              nombre: res.name,
              imagen: res.sprites.front_default,
              url: result.url,
            };
          })
        );
        setNext(next);
        setPrevious(previous);
        setPokemons(arrayPokemons);
      } catch (error) {}
    };
    const getSprites = (sprites) => {
      if (sprites !== null) {
        return Object.values(sprites).filter((a) => a !== null).slice(0, 4);
      }else {
        return []
      }
    };
    const getTipos = (tipos) => {
      if (tipos !== null) {
        return tipos
          .map((item) => item.type.name)
          .join()
          .replaceAll(",", " ");
      } else {
        return "............";
      }
    };
    const getMovimientos = (moves) => {
      if (moves !== null) {
        return moves
          .slice(0, 3)
          .map((item) => item.move.name)
          .join()
          .replaceAll(",", " ");
      } else {
        return "............";
      }
    };
    const buscarPokemon = async (url) => {
      let res = await getPokemon(url);
      if(res !== null) {
        const { sprites, types, weight, moves } = res;
        let pok = {
          id: res.id,
          nombre: res.name,
          imagen: res.sprites.front_default,
          url: res.url,
          tipos: getTipos(types),
          peso: `${weight}kg`,
          sprites: getSprites(sprites),
          movimientos: getMovimientos(moves),
        };
        setPokemon(pok);
      }
    }
    const nextPokemons = async () => {
      if(next == null) {
        alert("No existen registros para cargar");
        return;
      }
      setPokemons([]);
      cargarPokemons(next);
    }
    const previousPokemons = async () => {
      if (previous == null) {
        alert("No existen registros para cargar");
        return;
      }
      setPokemons([]);
      cargarPokemons(previous);
    };

  const data = {
    pokemon,
    pokemons,
    nextPokemons,
    previousPokemons,
    previous,
    next,
    arrayColores,
    buscarPokemon,
  };
  return (
    <PokemonContext.Provider value={data}>{children}</PokemonContext.Provider>
  );
};

export { PokemonProvider };
export default PokemonContext;
