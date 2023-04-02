const express = require('express')

const app = express()

app.get("/set-cookie" , (req ,res)=>{
    res.cookie('name' , 'list' ,{maxAge:60*1000})
    res.send("home")
})
app.listen(9000)