import { Carrito } from "../models/carritoModel.js";

const CarritoController = {

    agregar: (req, res) => {

        try {
            const { body } = req
            const add = Carrito.create({
                Nombre: body.nombre,
                Precio: body.precio,
                Total: body.total,
                Cantidad: body.cantidad,
                Identificacion: body.email
            })

            if (add) {
                return res.status(200).send('Compra agregada.');
            }
        } catch (e) {
            console.log(e)
            return res.status(500).send('Error.' + e)
        }

    },

    eliminar: async (req, res) => {
        try {
            const { body } = req
            const carrito = await Carrito.findById(body._id)
            if (carrito) {
                carrito.remove()
                res.status(200).send('eliminado')
            }
        } catch (e) {
            return res.status(500).send('Error', e)
        }
    },

    confirmar: (req, res) => {

    },

    obtener: async (req, res) => {

        try {
            const { body } = req
            const carrito = await Carrito.find({ Identificacion: body.email })
            if (carrito) {
                res.status(200).send(carrito)
            }
        } catch (e) {
            res.status(500).send(e)
        }
    },

    actualizar: (req, res) => {

    }
}


export { CarritoController }