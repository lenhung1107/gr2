const doctorRoute =require('./doctors');
const packRoute =require('./packs');
const doctorDetailRoute =require('./doctorDetail');
const userRoute=require('./user');
const authentication= require('./auththentication');
const specialtiesRouter = require('./specialties');
const appointment=require('./appointments');
const workdate= require('./workdate');
const prescripttion=require('./prescription')
const patient = require('./patient');
const testOrder= require('./testOrder');
const test= require('./test');
const userUseRoute= require('./userUse');
const statistics = require ('./statistics');
const hotnew =require('./hotnew')
function route(app){
    
    // app.use('/news',newsRouter)  
    app.use('/doctor', doctorRoute);
    app.use('/pack', packRoute);
    app.use('/orderDoctor',doctorDetailRoute);
    app.use('/adminpage',userRoute);
    app.use('/user',userUseRoute);
    app.use('/auth',authentication);
    app.use('/specialties', specialtiesRouter);
    app.use('/appointment', appointment);
    app.use('/schedule',workdate);
    app.use('/prescription',prescripttion);
    app.use('/patient',patient);
    app.use('/testOrder',testOrder);
    app.use('/test',test);
    app.use('/statistics', statistics);
    app.use('/hotnew',hotnew);

}
module.exports = route;
