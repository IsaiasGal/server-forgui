import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email:{
    type: String,
    required: true
  },
  passw: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
}, {timestamps: true});

export default model('User', UserSchema);