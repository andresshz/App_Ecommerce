import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Usuarios from "./Usuarios";
import '../styles/index.css'
function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/usuariosAgregados" element={<Usuarios />} />
    </Routes>
  );
}


export default App;