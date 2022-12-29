import { useEffect, useState } from "react";
import logo from "../img/logo.png";
import { DiAptana } from "react-icons/di";
import { MostrarCarrito } from "../api/operaciones.api.js";

const objectKeys = (objeto = {}) => {
  const arreglo = [];
  Object.keys(objeto).map((key) => {
    let values = objeto[key];
    arreglo.push(values.Total);
  });
  return arreglo;
};

const objectKeysItems = (objeto = {}) => {
  const arregloItems = [];
  Object.keys(objeto).map((key) => {
    let values = objeto[key];
    arregloItems.push(values.Cantidad);
  });
  return arregloItems;
};

function Menu({ Nombre, Precio }) {
  const [email, setEmail] = useState();
  const [carrito, setCarrito] = useState({});
  const [subtotal, setsubTotal] = useState();
  const [total, setTotal] = useState();
  useEffect(() => {
    function loadSesion() {
      const email = localStorage.getItem("SesionNormal");
      setEmail(email);
    }
    const loadCarrito = async () => {
      const form = new FormData();
      const identificacion = localStorage.getItem("SesionNormal");
      form.append("email", identificacion);
      const carritoResponses = await MostrarCarrito(form);

      const valuesTotal = objectKeys(carritoResponses.data);
      const valuesItems = objectKeysItems(carritoResponses.data);

      if (
        Object.keys(valuesTotal).length === 0 ||
        Object.keys(valuesItems).length === 0
      ) {
        setTotal(0);
        setsubTotal(0);
        return;
      }

      const reduceTotal = valuesTotal.reduce((a, b) => a + b);
      const reduceItems = valuesItems.reduce((a, b) => a + b);
      setsubTotal(reduceTotal);
      setTotal(reduceItems);
      setCarrito(carritoResponses.data);
    };

    loadCarrito();
    loadSesion();
  }, []);

  return (
    <div className="flex w-full shadow-lg mb-8">
      <h3 className="p-4">
        <img className="w-5 h-5" src={logo} />
      </h3>
      <h3 className="p-4 font-bold">Mi tienda</h3>
      <div style={{ margin: "0 auto" }} className="flex">
        <p className="hover:bg-blue-500 p-4 cursor-pointer transition duration-700 ease-in-out">
          Tienda
        </p>
        <p className="hover:bg-blue-500 p-4 cursor-pointer transition duration-700 ease-in-out">
          Compras
        </p>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">{total}</span>
          </div>
        </label>
        <div
          tabIndex={0}
          className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            <span className="font-bold text-lg">{total} Items</span>
            <span className="text-info">Subtotal: ${subtotal}</span>
            <div className="card-actions">
              <label htmlFor="my-modal" className="btn">
                Ver Compra
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <img
            className="cursor-pointer w-10 rounded-full"
            src="https://res.cloudinary.com/dwyu8x1f3/image/upload/v1670290897/ImagenDefault/andres_dev_lyjuih.svg"
          />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-auto"
        >
          <li>
            <a>
              <span className="font-semibold">User:</span>
              {email}
            </a>
          </li>
          <li>
            <a>
              <span className="font-semibold">
                <DiAptana />
              </span>
              Configurar perfil
            </a>
          </li>
        </ul>
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmar Compra:</h3>
          <p className="py-4">
            {Object.keys(carrito).map((key) => {
              const value = carrito[key];
              return (
                <b key={value._id}>
                  <br />
                  Nombre producto:
                  <span className="text-lime-600"> {value.Nombre}</span> <br />
                  Precio: <span className="text-lime-600">
                    ${value.Precio}
                  </span>
                  <br />
                  Cantidad:
                  <span className="text-lime-600">{value.Cantidad}</span>
                </b>
              );
            })}
            <br />
            <b>
              Total:<span className="text-lime-600">${subtotal}</span>{" "}
            </b>
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-error">
              Limpiar Carrito
            </label>
            <label htmlFor="my-modal" className="btn btn-success">
              Confirmar
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
