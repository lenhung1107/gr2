const mongoose= require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/booking_healthcare',{
            useNewUrlParser: true,
            useUnifiedTopology:true

        });
        console.log('connect success');
    }
    catch(error){
        console.log('failes');

    }

}
module.exports={connect};
