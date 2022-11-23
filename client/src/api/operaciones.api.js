import axios from 'axios'

// * Funciona de ambas formas 

export const Registrar = async (values) => await axios.post('http://localhost:4000/crearUsuario', values)
export const Mostrar = async (values) => await axios.get('http://localhost:4000/obtenerUsuario', values)

// export const Registrar = async (values) => {
    
//     const request = await fetch('http://localhost:4000/crearUsuario', {
//       method:'POST',
//       headers:{
//         'Content-Type':'application/json'
//       },
//       body: JSON.stringify(values)
//     })

//     const responses = await request.text()

// }