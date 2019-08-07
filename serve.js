
const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const api =require("./api")
app.use(bodyparser.json())

app.listen(2333, ()=>{
    api(app)
    console.log('http://127.0.0.1:2333')           
})  





