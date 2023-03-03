import mongoose from "mongoose";

const Schema = mongoose.Schema; 

const refreshTokenSchema = new Schema({
    token: { type:String, unique:true},
    
},{timestamp:false});

export default mongoose.model('refreshToken', refreshTokenSchema, 'refreshTokens' )

