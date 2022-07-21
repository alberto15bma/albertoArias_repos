import { useEffect, useState } from "react";
import { getPokomons, getPokemon } from "../services/PokemonService";

export const usePokemon = (url = null) => {
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  useEffect(() => {
    cargarPokemons(url);
  }, [url]);

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
            url: result.url
          }
        })
      )
      setNext(next);
      setPrevious(previous);
      setPokemons(arrayPokemons);
    } catch (error) {
      
    }
  };
  return {
    next,
    previous,
    pokemons
  };
}
