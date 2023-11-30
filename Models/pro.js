// database
//tables/collections
//schema
//model<..>document

const mongoose=require('mongoose');

const Pro=new mongoose.Schema({
    name:String,
    email:{type:String},
    age:Number,
    city:{type:String,required:true}
})

module.exports=mongoose.model("ProUser",Pro);