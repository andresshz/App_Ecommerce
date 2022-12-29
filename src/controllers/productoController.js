import { Producto } from "../models/productoModel.js"
import { subirImagen } from "../cloudinary/cloudoperations.js"
import fs from 'fs-extra'
const ProductosController = {

    crear: async (req, res) => {
        try {
            const { body } = req

            const producto = new Producto({
                Nombre: body.Nombre, Precio: body.Precio, Categoria: body.Categoria, Cantidad: body.Cantidad, Marca: body.Marca
            })


            if (req.files?.image) {


                const result = await subirImagen(req.files.image.tempFilePath)
                const productoImagen = new Producto({
                    Nombre: body.Nombre, Precio: body.Precio, Categoria: body.Categoria, Cantidad: body.Cantidad, Marca: body.Marca, public_id: result.public_id, secure_id: result.secure_url
                })
                productoImagen.save()
                if (productoImagen) {
                    res.status(200).send('exito')
                }
                fs.remove(req.files.image.tempFilePath)
                return;
            }

            const create = producto.save()

            if (create) {
                res.status(200).send('exito')
            }

        } catch (err) {
            res.status(500).send(err)
        }
    },

    obtener: async (req, res) => {
        try {
            const productos = await Producto.find()
            if (productos) {
                res.status(200).send(productos)
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

export { ProductosController }