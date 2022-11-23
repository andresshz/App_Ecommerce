import { Router } from "express";
import { ControllerUsuario } from "../controllers/usuarioController.js";

const routes = Router()

routes.post('/crearUsuario', ControllerUsuario.crear) // Crear un nuevo usuario.

routes.get('/obtenerUsuario', ControllerUsuario.obtener) //Obtener Usuario

export default routes