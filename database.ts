import {connect} from 'mongoose'

export const startConnection = async()=>{
    try{
    const db = await connect('mongodb+srv://Isaias:Isaias@cluster0.zy1isgx.mongodb.net/')
    console.log('Connected to MongoDB:', db.connection.name)
    }catch(error){
        console.error('Connection to MongoDB failded:', error)
    }
}
