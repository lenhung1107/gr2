const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema(
    {
        name:{ type: String},
        age: {type: Number},
        phone: {type: Number},
        address:{type:String},
        src:{type: String},
        email:{type: String},
        gender:{type: String}
      
    }
);
module.exports=mongoose.model('User', User);
