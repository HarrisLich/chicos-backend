require('dotenv').config()

const express = require('express')
const apiRouter = require('./routes/api')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

mongoose.set({strictQuery: false})
mongoose.connect(process.env.dbString)

app.use(cors())
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.json({msg: "testing!!"})
})

app.use("/api", apiRouter)

const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`listening on port: ${port}`))