import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.CLOUD_NAME)
export async function subirImagen(filePath) {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true
    });

    return await cloudinary.uploader.upload(filePath, {
        folder: 'AppEcommerce'
    })
}