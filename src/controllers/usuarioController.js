import { Usuario } from "../models/usuarioModel.js"
const ControllerUsuario = {

    crear: async (req, res) => {
        try {
            const { body } = req
            console.log(body)
            const userCreate = await Usuario.create({ identificacion: body.identificacion, password: body.password })
            if (userCreate) {
                res.status(200).send('Usuario creado correctamente.')
            }
        } catch (err) {
            res.status(500).send('Error:', err)
        }
    },

    obtener: async (req, res) => {
        try {
            const obtenerUsuario = await Usuario.find()
            if (obtenerUsuario) {
                console.log(obtenerUsuario)
                res.status(200).send(obtenerUsuario)
            }
        } catch (err) {
            res.status(500).send('Error:', err)
        }
    }

}

export { ControllerUsuario }