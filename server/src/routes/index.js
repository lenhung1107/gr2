const doctorRoute =require('./doctors');
const packRoute =require('./packs');
const doctorDetailRoute =require('./doctorDetail');
const userRoute=require('./user');
const authentication= require('./auththentication');
const specialtiesRouter = require('./specialties');
const appointment=require('./appointments');
const workdate= require('./workdate');
function route(app){
    
    // app.use('/news',newsRouter)  
    app.use('/doctor', doctorRoute);
    app.use('/pack', packRoute);
    app.use('/orderDoctor',doctorDetailRoute);
    app.use('/adminpage',userRoute);
    app.use('/auth',authentication);
    app.use('/specialties', specialtiesRouter);
    app.use('/bookAppointment', appointment);
    app.use('/schedule',workdate);
}
module.exports = route;
