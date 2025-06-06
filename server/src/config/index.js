const mongoose= require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb+srv://cherrynhung5:123@bookinghealthcare.qdxbu9q.mongodb.net/?retryWrites=true&w=majority&appName=bookinghealthcare',{
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
