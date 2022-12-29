import { Usuario } from "../models/usuarioModel.js"
import bcryptjs from 'bcryptjs'
import Jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

const buscarIdentificacion = (Usuario) => {
    if (Usuario === null) {
        return true;
    }
    return false;
}


const generarToken = _id => Jwt.sign({ _id }, '12345678proyecto2022')

const ControllerUsuario = {

    crear: async (req, res) => {
        try {
            const { body } = req
            if (body.password === body.passwordconfirm) {
                const salt = bcryptjs.genSaltSync(10)
                const hash = bcryptjs.hashSync(body.password, salt)
                const userCreate = await Usuario.create({ identificacion: body.identificacion, password: hash })
                if (userCreate) {
                    const buscarPorIdentificacion = await Usuario.find({ identificacion: body.identificacion })
                    const respuesta = buscarIdentificacion(buscarPorIdentificacion)

                    if (respuesta === true) {
                        res.send('400')
                        return;
                    }
                    res.status(200).send('Exito')
                }
                return;
            }

            res.send('500')

        } catch (err) {
            res.status(500).send('Error:', err)
        }
    },

    obtener: async (req, res) => {
        try {
            const obtenerUsuario = await Usuario.find()
            if (obtenerUsuario) {
                res.status(200).send(obtenerUsuario)
            }
        } catch (err) {
            res.status(500).send('Error:', err)
        }
    },

    Logear: async (req, res) => {
        const { body } = req
        const buscarUsuario = await Usuario.findOne({ identificacion: body.identificacion })
        if (buscarUsuario) {
            
            const compare = bcryptjs.compareSync(body.password, buscarUsuario.password)
            if (compare) {
                const token = generarToken(buscarUsuario._id)
                
                res.status(200).send({token: token, email: buscarUsuario.identificacion})
                return;
            }

            res.send('error')
            
        }
    }

}

export { ControllerUsuario }