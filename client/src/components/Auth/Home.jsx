import { Form, Formik } from "formik";
import { Registrar } from "../../api/operaciones.api.js";
import { Alerta, AlertaConfirm } from "../../../alertas/alertas.js";
import { validaciones } from "../../../validaciones/validaciones.js";
import imagen from '../../img/registro.png'
import "../../styles/index.css";

function Home() {
  return (
    <>
      <div>
        <h1
          className="text-center text-3xl font-bold"
          style={{ marginBottom: "2%", marginTop: "10%" }}
        >
          Registro
        </h1>
        <Formik
          initialValues={{
            identificacion: "",
            password: "",
            passwordconfirm: "",
          }}
          onSubmit={async (values) => {
            try {
              const validar = validaciones(values); //Validaciones
              if (validar.required === true) {
                Alerta("Rellenar los campos vacios", "warning");
                return;
              }
              if (validar.email === true) {
                Alerta("Pattern incorrecto para el email.", "warning");
                return;
              }
              const responses = await Registrar(values);
              const respuesta = responses.data;
              if (respuesta === 500) {
                Alerta("Las contraseñas no coinciden.", "danger");
                return;
              }
              if (respuesta === 400) {
                Alerta(
                  "Este username o email, ya están registrados.",
                  "warning"
                );
                return;
              }
              if (responses.status <= 200) {
                AlertaConfirm("Cuenta creada correctamente.", "success");
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {({ handleChange, handleSubmit }) => (
           
              <div className="flex">
                <div
                  className=""
                  style={{ backgroundImage:`url(${imagen})`, backgroundSize:'cover', width: "19%", marginLeft:'31%' }}
                >
                   
                </div>
                <Form
                  onSubmit={handleSubmit}
                  className="shadow-lg"
                  style={{
                    width: "19%",
                    padding: "10px",
                    borderRadius: "2px",
                    backgroundColor: "white",
                  }}
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Ingrese un email
                      </span>
                    </label>
                    <input
                      type="text"
                      name="identificacion"
                      className="block form-control w-full input input-bordered input-sm max-w-xs"
                      placeholder="Ingrese su email ..."
                      onChange={handleChange}
                    />
                  </div>

                  <label className="label">
                    <span className="label-text font-medium text-base">
                      Ingrese una password
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Ingrese su password ..."
                    className="block form-control w-full input input-bordered input-sm max-w-xs"
                    onChange={handleChange}
                  />
                  <label className="label">
                    <span className="label-text font-medium text-base">
                      Repetir password
                    </span>
                  </label>
                  <input
                    type="password"
                    name="passwordconfirm"
                    placeholder="Repetir contraseña ..."
                    className="block form-control w-full input input-bordered input-sm max-w-xs"
                    onChange={handleChange}
                  />
                  <button
                    className="w-full my-3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    type="submit"
                  >
                    Registrar
                  </button>
                </Form>
              </div>

          )}
        </Formik>
      </div>
    </>
  );
}

export default Home;
