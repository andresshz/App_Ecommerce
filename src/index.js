import expres from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
dotenv.config()
const MONGODB = process.env.MONGODB

mongoose.connect(MONGODB)

const port = process.env.PORT

const app = expres()

app.use(cors())
app.use(expres.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './storage/'
}));
app.use(routes)


app.listen(port, () => {
    console.log('aplicación corriendo en el puerto', port)
})