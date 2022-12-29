import { Formik, Form } from "formik";
import { crearProducto } from "../api/operaciones.api.js";
import { useState } from "react";

import "../styles/index.css";

function Productos() {
  const getSesionAdmin = () => localStorage.getItem("SesionNormal");

  const admin = getSesionAdmin();
  if (!admin) {
    return <h1>No puede ver este contenido</h1>;
  }

  const [selectedFile, setSelectedFile] = useState();

  function loadFile(e) {
    setSelectedFile(e.target.files[0]);
  }
  return (
    <>
      
      <h1 className="text-center text-2xl font-bold mb-2 mt-5">Productos</h1>
      <p className="text-center" style={{ color: "#6B7280" }}>
        Agregar nuevos productos a la tienda.
      </p>
      <Formik
        initialValues={{
          Nombre: "",
          Precio: "",
          Categoria: "",
          Cantidad: "",
          Marca: "",
        }}
        onSubmit={async (values) => {
          try {
            const form = new FormData();
            form.append("Nombre", values.Nombre);
            form.append("Precio", values.Precio);
            form.append("Cantidad", values.Cantidad);
            form.append("Categoria", values.Categoria);
            form.append("Marca", values.Marca);
            form.append("image", selectedFile);

            const crear = await crearProducto(form);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form className="shadow-xl p-7 w-96 mx-auto" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">
                  Ingrese nombre
                </span>
              </label>
              <input
                type="text"
                name="Nombre"
                className="input-bordered input input-sm max-w-xs"
                onChange={handleChange}
                placeholder="Ingrese nombre ..."
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">
                  Ingrese precio
                </span>
              </label>
              <input
                type="text"
                name="Precio"
                className="input-bordered input input-sm max-w-xs"
                onChange={handleChange}
                placeholder="Ingrese precio ..."
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">
                  Ingrese categoria
                </span>
              </label>
              <input
                type="text"
                name="Categoria"
                className="input-bordered input input-sm max-w-xs"
                onChange={handleChange}
                placeholder="Ingrese categoria ..."
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">
                  Ingrese cantidad
                </span>
              </label>
              <input
                type="text"
                name="Cantidad"
                className="input-bordered input input-sm max-w-xs"
                onChange={handleChange}
                placeholder="Ingrese cantidad ..."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">
                  Ingrese marca
                </span>
              </label>
              <input
                type="text"
                name="Marca"
                className="input-bordered input input-sm max-w-xs"
                onChange={handleChange}
                placeholder="Ingrese marca ..."
              />
            </div>
            <div className="form-control">
              <label>Subir Archivo</label>

              <input
                id="file"
                name="files"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={loadFile}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              <p>Imagenes: .png , gif , jpeg</p>
            </div>
            <div style={{ marginTop: "2%" }} className="form-control">
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Productos;
