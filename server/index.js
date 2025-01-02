const express = require('express')
const route = require('./src/routes/index')
const app = express()
const port =3000
const db =require('./src/config/index')
//Routes init

//conect db
db.connect()

route(app)
app.listen(port,()=> console.log(`listening at http://localhost:${port}`))