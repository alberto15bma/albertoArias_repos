import { createContext, useEffect, useState } from "react";
import { getPokemon, getPokomons } from "../services/PokemonService";
import pokk from "../models/pokemon";
import SERVER from "../utils/server";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState(pokk);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
      cargarPokemons(null);
    }, []);
    useEffect(() => {
      setNumeroPagina();
    }, [next]);

    const arrayColores = ["color1", "color2", "color3", "color4"];

    const cargarPokemons = async (url) => {
      setCargando(true);
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
      finally {
        setCargando(false);
      }
    };
    const filtraPokemon = async (e) => {
      if (e.key === "Enter") {
        setPokemons([]);
        setCargando(true);
        if (busqueda.length <= 0) {
          cargarPokemons(null);
          return;
        }
        const url = `${SERVER.host}/${busqueda}`
        let res = await getPokemon(url);
        if(res !== null) {
          setPokemons([
            {
              id: res.id,
              nombre: res.name,
              imagen: res.sprites.front_default,
              url,
            },
          ]);
        }
        else{
          setPokemons([])
        }
        setNext(null);
        setPrevious(null);
        setCargando(false);
      }
    }
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

    const setNumeroPagina = () => {
      if (next === null){
        setPagina(1);
        return
      }
      let numeros = next
        .split("?")[1]
        .split("&")
        .map((item) => parseInt(item.split("=")[1]));
      let desp = numeros[0],
          ant = numeros[1];
      let pag = desp / ant;
      setPagina(pag);
    }

  const data = {
    pokemon,
    pokemons,
    nextPokemons,
    previousPokemons,
    previous,
    next,
    arrayColores,
    buscarPokemon,
    busqueda,
    setBusqueda,
    filtraPokemon,
    cargando,
    pagina
  };
  return (
    <PokemonContext.Provider value={data}>{children}</PokemonContext.Provider>
  );
};

export { PokemonProvider };
export default PokemonContext;
