import { Router } from "express";
import { ControllerUsuario } from "../controllers/usuarioController.js";
import { ProductosController } from "../controllers/productoController.js";
import { CarritoController } from "../controllers/carritoController.js";
import { Middelware } from "../auth/Middelware.js";
const routes = Router()

// Rutas protegidas con middelware.

routes.post('/crearUsuario', ControllerUsuario.crear) // Crear un nuevo usuario.

routes.get('/obtenerUsuario', Middelware, ControllerUsuario.obtener) //Obtener Usuario

routes.post('/Logear', ControllerUsuario.Logear) //Login Usuario

routes.post('/crearProducto', Middelware, ProductosController.crear) // Creación de producto

routes.get('/obtenerProductos', Middelware, ProductosController.obtener) // Obteniendo todos los productos

routes.post('/agregarCarrito', Middelware, CarritoController.agregar) // Agregar al carrito.

routes.post('/obtenerCarrito', Middelware, CarritoController.obtener) // Mostrar elementos del carrito.

export default routes