const doctorRoute =require('./doctors')

function route(app){
    
    // app.use('/news',newsRouter)  
    app.use('/doctor', doctorRoute);
}
module.exports = route;
