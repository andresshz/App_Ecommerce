import axios from 'axios'


// * Funciona de ambas formas 

export const Registrar = async (values) => await axios.post('http://localhost:4000/crearUsuario', values)
export const Mostrar = async () => await axios.get('http://localhost:4000/obtenerUsuario')
export const Logear = async (values) => await axios.post('http://localhost:4000/Logear', values)
export const ObtenerProductos = async () => await axios.get('http://localhost:4000/obtenerProductos', {headers:{
    'authorization': localStorage.getItem('Identificacion')
}})
export const crearProducto = async (values) => await axios.post('http://localhost:4000/crearProducto', values, {headers: {
    'Content-Type':'multipart/form-data'
}})

export const agregarCarrito = async (values) => await axios.post('http://localhost:4000/agregarCarrito', values, {headers: {
    'authorization': localStorage.getItem('Identificacion')
}})
export const MostrarCarrito = async (values) => await axios.post('http://localhost:4000/obtenerCarrito', values,{headers:{
    'authorization': localStorage.getItem('Identificacion')
}})
// export const crearProducto = async (values) => {
    
//     const request = await fetch('http://localhost:4000/crearProducto', {
//       method:'POST',
//       headers:{
//         'Content-Type':'application/json',
//         'Content-Type':'multipart/form-data'
//       },
//       body: JSON.stringify(values),
//     })
 
//     const responses = await request.text()

// }