import { Form, Formik } from "formik";
import { Registrar } from "../api/operaciones.api.js";
import sweetalert from "sweetalert2";

function Home() {
  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-medium" style={{marginBottom: '2%', marginTop:'10%'}}>Registro</h1>
        <Formik
          initialValues={{
            identificacion: "",
            password: "",
            passwordconfirm: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
            try {
              const responses = await Registrar(values);
              const respuesta = responses.data;
              if (respuesta === 500) {
                alert("Las contraseñas no coinciden.");
                return;
              }
              if (respuesta === 400) {
                alert("Este username o email, ya están registrados.");
                return;
              }
              if (responses.status <= 200) {
                sweetalert
                  .fire({
                    title: "Cuenta creada correctamente.",
                    confirmButtonText: "OK",
                    icon: "success",
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      location.reload();
                    }
                  });
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <div className="shadow-lg" style={{width:'19%', margin: '0 auto', padding: '10px', borderRadius:'2px', backgroundColor:'white'}}>
              <Form onSubmit={handleSubmit}>
                <div className="form-control">
                <label className="label"><span className="label-text font-medium text-base">Ingrese un email</span></label>
                <input
                  type="text"
                  name="identificacion"
                  className="block form-control w-full input input-bordered input-sm max-w-xs"
                  placeholder="Ingrese su email ..."
                  onChange={handleChange}
                />
                </div>
                
                <label className="label"><span className="label-text font-medium text-base">Ingrese una password</span></label>
                <input
                  type="password"
                  name="password"
                  placeholder="Ingrese su password ..."
                  className="block form-control w-full input input-bordered input-sm max-w-xs"
                  onChange={handleChange}
                />
                 <label className="label"><span className="label-text font-medium text-base">Repetir password</span></label>
                <input
                  type="password"
                  name="passwordconfirm"
                  placeholder="Repetir contraseña ..."
                  className="block form-control w-full input input-bordered input-sm max-w-xs"
                  onChange={handleChange}
                />
                <button className="w-full my-3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" type="submit">Registrar</button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Home;
