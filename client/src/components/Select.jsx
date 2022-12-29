function SelectCantidad({ Disponibles }) {
  const loadOptions = () => {
    const arr = [];
    for (let i = 1; i <= parseInt(Disponibles); i++) {
      arr.push(i);
    }
    return arr;
  };

  const options = loadOptions();

  return (
    <>
      {options.map((elemento) => (
        <option key={elemento}> {elemento}</option>
      ))}
    </>
  );
}

export default SelectCantidad;
