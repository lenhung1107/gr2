const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const Pack = new Schema(
    {
        name:{ type: String},
        room:{type:String},
        image:{type: String},
        price:{type: String},
        des:{type:String}
      
    }
);
module.exports=mongoose.model('Pack', Pack);

