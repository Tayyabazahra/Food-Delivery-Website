import mongoose from "mongoose";
const user=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://pic.onlinewebfonts.com/thumbnails/icons_258083.svg",
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },
    cart:{
        type:Object,
        default:{},
    },
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"orders"
    }],


},{minimize:false});
export const Users=mongoose.model("users",user);