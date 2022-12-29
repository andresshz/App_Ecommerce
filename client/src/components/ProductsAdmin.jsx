import { useState, useEffect } from "react";
import { ObtenerProductos } from "../api/operaciones.api.js";
const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const products = await ObtenerProductos();
      console.log(products.data)
      setProductos(products.data);
    }
    loadProducts();
  }, []);

  return (
    <>
    <h1 className="text-center font-semibold text-2xl mb-5 mt-20
    ">Productos Admin</h1>
    <div className="overflow-x-auto relative w-2/3 mx-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Nombre producto
            </th>
            <th scope="col" className="py-3 px-6">
              Precio
            </th>
            <th scope="col" className="py-3 px-6">
              Cantidad
            </th>
            <th scope="col" className="py-3 px-6">
              Marca
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.map((elemento) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {elemento.Nombre}
              </th>
              <td className="py-4 px-6">{elemento.Precio}</td>
              <td className="py-4 px-6">{elemento.Cantidad}</td>
              <td className="py-4 px-6">{elemento.Marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ProductosAdmin;
