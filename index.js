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

app.listen(5001)