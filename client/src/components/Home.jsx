import { Form, Formik } from "formik";
import { Registrar } from "../api/operaciones.api.js";

function Home() {
  return (
    <div>
      <h1>Registro</h1>
      <Formik
        initialValues={{
          identificacion: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const responses = await Registrar(values);
            console.log(responses);
          } catch (err) {
            console.log(err);
          }
        }
      }
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label>Ingrese un username o correo electronico</label>
            <input type="text" name="identificacion" onChange={handleChange} />
            <label>Ingrese una password</label>
            <input type="password" name="password" onChange={handleChange} />
            <button type="submit">Registrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Home;
