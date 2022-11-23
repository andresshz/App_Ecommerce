import { useEffect, useState } from "react";
import { Mostrar } from "../api/operaciones.api.js";
const Productos = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    async function loadProductos() {
      const request = await Mostrar();

      setProductos(request.data);
    }

    loadProductos();
  }, []);

  return (
    <div>
      <h1>Usuarios:</h1>
      {productos.map((elemento) => (
        <div key={elemento._id}>
          <ul>
            <li>id: {elemento._id}</li>
            <li>{elemento.identificacion}</li>
            <li>{elemento.password}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Productos;
