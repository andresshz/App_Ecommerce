import mongoose from "mongoose";


const Producto = mongoose.model('Producto', {
    Nombre: { type: String, required: true, minlength: 3 },
    Precio: { type: String, required: true, minlength: 3 },
    Categoria: { type: String, required: true, minlength: 3 },
    Cantidad: { type: Number, required: true, minlength: 3 },
    Marca: { type: String, required: true, minlength: 3 },
    public_id: { type: String },
    secure_id: { type: String }

})

export { Producto }