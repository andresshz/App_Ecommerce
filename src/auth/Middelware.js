export const Middelware = (req, res, next) => {

    const auth = req.headers['authorization'];

    if (typeof auth !== 'undefined') {
        let bearer = auth.split(" ")
        let token = bearer[1]
        req.token = token
        next()
    }else{
        res.send('Acceso denegado')
    }



}

