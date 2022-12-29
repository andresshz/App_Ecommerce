import { Route, Routes } from "react-router-dom";
import Home from "./Auth/Home";
import Usuarios from "./AggregatesUsers";
import Login from "./Auth/Login";
import ProductosAñadidos from "./AggregatesProducts";
import Productos from "./AddProduct";
import ProductosAdmin from "./ProductsAdmin";
import Compra from "./ShowProduct";
import DefaultRoute from "./Default";
import '../styles/index.css'
function App() {
  return (
    <Routes>
      <Route path="/Registro" element={<Home />} />
      <Route path="/usuariosAgregados" element={<Usuarios />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Tienda" element={<ProductosAñadidos />} />
      <Route path="/AñadirProducto" element={<Productos />} />
      <Route path="/ProductosAdmin" element={<ProductosAdmin />} />
      <Route path="/Compra" element={<Compra />} />
      <Route path="*" element={<DefaultRoute />} /> 
    </Routes>
  );
}


export default App;