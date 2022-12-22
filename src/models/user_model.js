const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user_model_schema=new Schema({
    user_name:{
        type:String,
        required:true,
        trim:true
    },
    user_email:{
        type:String,
        required:true,
        trim:true
    },
    user_phone_number:{
        type:Number,
        required:true,
    },
    user_type:{
        type:String,
        required:true,
        trim:true
    },
    user_password:{
        type: String,
        required:true,
        trim:true
    }
});

module.exports = {
    user_model:mongoose.model("user_model", user_model_schema)
}
