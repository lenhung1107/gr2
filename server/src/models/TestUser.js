const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const TestUser = new Schema(
    {
        name:{
            type: String, 
            require: true,
        },
        username:{
            type: String, 
            require: true,
            unique: true
        },
        password:{
            type: String,
            require:true
        },
        admin:{
            type: Boolean,
            default: false
        },
    },{timestamps: true}
);
module.exports=mongoose.model('TestUser', TestUser);
