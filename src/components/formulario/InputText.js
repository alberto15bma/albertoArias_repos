const InputText = ({
  nombre,
  value = "",
  placeholder = "",
  icono = false,
  onChange = null,
  onkeydown = null,
}) => {
  let clases = "frm__input ";
  if (icono) clases = clases + "frm__input__icono";
  return (
    <input
      type="text"
      required
      placeholder={placeholder}
      className={clases}
      id={"txt_" + nombre}
      name={nombre}
      onChange={onChange}
      value={value}
      onKeyDown={onkeydown}
    />
  );
};
export default InputText;
