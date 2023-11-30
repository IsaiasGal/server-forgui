import {Schema, model} from 'mongoose';

const EstateSchema = new Schema({
    ImgURL: {
        type: String,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
   
    type:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    }, 
    ubication:{
        type: String,
        required: true,
        trim: true
    }, 
    price:{
        type: String,
        require:true,
        trim: true
    },
    lapse:{
        type: String,
        required: true,
        trim: true
    },
    postDate: {
        type: String,
        required: true,
        trim: true
    }
},
{
    versionKey: false
}
);

export default model ('Estate', EstateSchema)

