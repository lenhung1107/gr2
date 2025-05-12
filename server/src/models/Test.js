const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const Test = new Schema(
    {
        name:{ type: String},
        room:{type:String}
    }
);
module.exports=mongoose.model('Test', Test);

