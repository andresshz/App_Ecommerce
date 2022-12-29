import { Formik, Form } from "formik";
import { Logear } from "../../api/operaciones.api.js";
import "../../styles/index.css";
import {
  validaciones,
  validacionesLogin,
} from "../../../validaciones/validaciones.js";
import { Alerta, AlertaConfirm } from "../../../alertas/alertas.js";
import imagen from "../../img/registro.png";

const Login = () => {
  return (
    <>
      <div>
        <h1
          className="text-center text-3xl font-bold"
          style={{ marginBottom: "2%", marginTop: "10%" }}
        >
          Login
        </h1>
        <Formik
          initialValues={{
            identificacion: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try {
              const validar = validacionesLogin(values);
              if (validar.required === true) {
                Alerta("Rellenar los campos vacios", "warning");
                return;
              }
              if (validar.email === true) {
                Alerta("Email escrito incorrectamente.", "warning");
                return;
              }

              const responses = await Logear(values);
              if (responses.data === "error") {
                Alerta("El email y/o contraseña están incorrectos.", "danger");
                return;
              }

              const token = responses.data.token;
              const email = responses.data.email;
              if (email === "administrador@gmail.com") {
                localStorage.setItem("adminSesion", email);
              } else {
                localStorage.setItem("SesionNormal", email);
              }
              localStorage.setItem("Identificacion", token);
              if (responses.data) {
                AlertaConfirm("Logeado correctamente.", "success");
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
                style={{
                  backgroundImage: `url(${imagen})`,
                  backgroundSize: "cover",
                  width: "19%",
                  marginLeft: "31%",
                }}
              ></div>
              <Form
                onSubmit={handleSubmit}
                style={{
                  width: "20%",
                  padding: "10px",
                  borderRadius: "2px",
                }}
                className="shadow-lg"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base">
                      Ingrese su email
                    </span>
                  </label>
                  <input
                    type="text"
                    name="identificacion"
                    className="input-bordered input input-sm max-w-xs"
                    onChange={handleChange}
                    placeholder="Ingrese su email ..."
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base">
                      Ingrese su password
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña ..."
                    className="input-bordered input input-sm max-w-xs"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="w-full my-3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  type="submit"
                >
                  Iniciar Sesión
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
