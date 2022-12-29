import { useState } from "react";
import { useEffect } from "react";
import Menu from "./NavBar";
import { ObtenerProductos } from "../api/operaciones.api";
import "../styles/index.css";
import { AlertaReturn } from "../../alertas/alertas.js";

const sesion = () => localStorage.getItem("SesionNormal");

function ProductosAñadidos() {
  const sesionNormal = sesion();
  if (!sesionNormal) {
    return <div>No tiene acceso a este contenido</div>;
  }
  const [productos, setProductos] = useState([]);
  const [Nombre, setNombre] = useState();
  const [Precio, setPrecio] = useState();

  useEffect(() => {
    async function loadProductos() {
      const productosResponses = await ObtenerProductos();

      if (productosResponses.data === "Acceso denegado") {
        const login = AlertaReturn(
          "No tiene acceso a este contenido.",
          "warning"
        );

        if (login) {
          setTimeout("location.href = '/Login'", 3000);
        }
        return;
      }
      setProductos(productosResponses.data);
    }

    loadProductos();
  }, []);

  const comprarPrenda = (elemetos = {}) => {
    localStorage.setItem("Elementos", JSON.stringify(elemetos));
    window.location.href = "/Compra";
  };

  return (
    <>
      <Menu Nombre={Nombre} Precio={Precio} />
      <div className="flex justify-center flex-wrap gap-8">
        {productos.map((elemento) => (
          <div key={elemento._id} className="shadow-lg">
            <div
              className="h-48 w-auto"
              style={{
                backgroundImage: `url(${elemento.secure_id})`,
                backgroundSize: "cover",
              }}
            ></div>
            <p className="font-semibold text-lg text-center py-3">
              {elemento.Nombre}
            </p>
            <p className="text-center">
              <span className="font-semibold">Disponibles:</span>
              {elemento.Cantidad}
            </p>
            <p className="text-center">
              <span className="font-semibold">Precio:</span> {elemento.Precio}
            </p>
            <p className="text-center">
              <span className="font-semibold">Marca</span> {elemento.Marca}
            </p>

            <button
              type="submit"
              className="w-64 btn btn-accent mt-2 mb-2"
              onClick={() => {
                comprarPrenda(elemento);
              }}
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductosAñadidos;
