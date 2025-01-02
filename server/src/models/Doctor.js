const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const Doctor = new Schema(
    {
        name:{ type: String},
        specialty:{type:String},
        bio:{type:String},
        rating:{ type: Number, min: 0, max:5},
        appointments:{type:Number},
        image:{type: String},
        orderLink:{type:String},
        price:{type:String},
    }
);
module.exports=mongoose.model('Doctor', Doctor);

