const doctorRoute =require('./doctors')
const packRoute =require('./packs')
const doctorDetailRoute =require('./doctorDetail')
const userRoute=require('./user')
const authentication= require('./auththentication')
function route(app){
    
    // app.use('/news',newsRouter)  
    app.use('/doctor', doctorRoute);
    app.use('/pack', packRoute);
    app.use('/orderDoctor',doctorDetailRoute);
    app.use('/adminpage',userRoute);
    app.use('/auth',authentication);
}
module.exports = route;
