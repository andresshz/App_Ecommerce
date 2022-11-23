import mongoose from "mongoose";


const Usuario = mongoose.model('Usuario', {
    identificacion: { type: String, required: true, minlength: 3 },
    password: { type: String, required: true, minlength:3 }
})

export { Usuario }