const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const Pack = new Schema(
    {
        name:{ type: String},
        room:{type:String},
        image:{type: String},
        price:{type: String},
        des:{type:String},
         rating: { type: Number, min: 0, max: 5 },
      
    }
);
module.exports=mongoose.model('Pack', Pack);

