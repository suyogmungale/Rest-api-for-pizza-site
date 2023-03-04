import mongoose from "mongoose";
import {APP_URL} from '../config/index.js'
import path from 'path';

const Schema = mongoose.Schema; 

const productSchema = new Schema({
    name: { type:String, required:true},
    price: { type:Number, required:true},
    size: { type:String, required:true},
    image: { type:String, required:true, get: function(image) {
        return `${APP_URL}/uploads/${path.basename(image)}`;
    }}
},{timestamp:true, toJSON:{getters:true}, id:false });


export default mongoose.model('Product', productSchema, 'products' )

