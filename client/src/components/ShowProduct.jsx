import Menu from "./NavBar";
import { useState } from "react";
import { useEffect } from "react";
import SelectCantidad from "./Select";
import { agregarCarrito } from "../api/operaciones.api.js";
import { Alerta } from "../../alertas/alertas.js";
// let suma = "";

const authObject = () => {
  let elementos = {};
  elementos = localStorage.getItem("Elementos");
  const Objeto = JSON.parse(elementos);
  return Objeto;
};

function Compra() {
  const [disponibles, setDisponibles] = useState();
  const [producto, setProducto] = useState([]);
  const [option, setOption] = useState();

  const totalPrice = (precio, cantidad) => {
    const preciototal = parseFloat(precio) * cantidad;
    return preciototal;
  };

  async function agregarCar(elementos = {}) {
    const suma = parseInt(disponibles) - option;
    setDisponibles(suma);
    const precio = totalPrice(elementos.Precio, option);
    const email = localStorage.getItem("SesionNormal");
    const form = new FormData();
    form.append("nombre", elementos.Nombre);
    form.append("precio", parseFloat(elementos.Precio));
    form.append("total", precio);
    form.append("cantidad", parseInt(option));
    form.append("email", email);

    const add = await agregarCarrito(form);
    if (add) {
      Alerta("Producto agregado al carrito", "success");
      return;
    }
  }

  useEffect(() => {
    const Objeto = authObject();
    setProducto(Objeto);
    setDisponibles(Objeto.Cantidad);
  }, []);

  const onChangeSelect = (e) => {
    const optionselected = e.target.value;

    setOption(parseInt(optionselected));
  };

  return (
    <>
      <Menu />

      <div className="flex mx-auto w-1/2">
        <img className="h-96 w-auto" src={producto.secure_id} />

        <div className="p-10">
          <p>
            <span className="font-bold">Nombre:</span> {producto.Nombre}
          </p>
          <p>
            <span className="font-bold">Categoria:</span> {producto.Categoria}
          </p>
          <p>
            <span className="font-bold">Marca:</span> {producto.Marca}
          </p>
          <p>
            <span className="font-bold">Precio:</span> {producto.Precio}
          </p>
          <p>
            <span className="font-bold">Disponibles:</span> {disponibles}
          </p>
          <label className="label">
            <span className="label-text font-medium text-base">Qty:</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={onChangeSelect}
          >
            <SelectCantidad Disponibles={disponibles} />
          </select>

          <button
            type="submit"
            className="w-64 btn btn-accent mt-2 mb-2"
            onClick={() => {
              agregarCar(producto);
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </>
  );
}

export default Compra;
