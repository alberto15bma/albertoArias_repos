import { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import PokemonContext from "../context/PokemonContext";
import InputText from "./formulario/InputText";

const CabeceraPokemon = () => {
  const { buscarPokemon, setBusqueda, busqueda } = useContext(PokemonContext);

  return (
    <header className="header">
      <h3 className="header__titulo frm__titulo">Listado de pokemon</h3>
      <div className="header__busqueda container">
        <div className="contenedor__input">
          <BiSearch className="input__icon" />
          <InputText
            placeholder="Buscar"
            nombre="Buscar"
            icono={true}
            value={busqueda}
            onkeydown={buscarPokemon}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};
export default CabeceraPokemon;
