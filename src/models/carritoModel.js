import mongoose from "mongoose";

mongoose.connect('mongodb+srv://AndresDev:shz150193_dev04@devcluster.bbm2crg.mongodb.net/AppEcommerce?retryWrites=true&w=majority')
const Carrito = mongoose.model('carrito', {
    Nombre: { type: String, required: true },
    Precio: { type: Number, required: true },
    Total: { type: Number, required: true },
    Cantidad: { type: Number, required: true },
    Identificacion: { type: String, required: true }
})

export { Carrito }