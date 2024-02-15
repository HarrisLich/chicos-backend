const express = require('express')
const router = express.Router()
const { genPassword, validPassword } = require('../lib/passwordUtils')
const User = require('../models/user')
const Order = require('../models/order')

router.get("/", (req, res) => {
    res.json({ msg: "test" })
})

router.post("/orders", async (req, res) => {
    let orders = await Order.find({}).sort().limit(10)
    res.send(orders)
})

router.post('/updateAccount', async (req, res) => {
    const user = req.body
    console.log(user)
    const newUser = await User.findByIdAndUpdate(user._id, { marked: user.marked })
    res.json({ updated: true })
})

router.post('/submitRefferal', async (req, res) => {
    const user = req.body.user
    const refferal = req.body.refferal
    const a = await User.findOne({ username: user })
    const b = await User.findOne({ username: refferal })
    console.log(b)
    if (b) {
        let arr = a.reffered
        if (!arr.includes(b.username)) {
            arr.push(b.username)
            //update
            await User.findByIdAndUpdate(a._id, { reffered: arr })
            res.json({ complete: true })
        } else {
            console.log("already reffered")
            res.json({ complete: false })
        }

    } else {
        console.log("cannot find user")
        res.json({ complete: false })
    }
})

router.delete('/deleteRefferal', async (req, res) => {
    const a = await User.findById(req.body.user)
    let arr = a.reffered
    const index = arr.indexOf(req.body.reffered)
    console.log(index)
    if (index > -1) {
        arr.splice(index, 1)
    }
    await User.findByIdAndUpdate(req.body.user, { reffered: arr })
    res.status(200)
})

router.post("/accounts", async (req, res) => {
    let users = await User.find({})
    res.send(users)
})

router.post("/register", async (req, res) => {
    try {
        const data = req.body
        const password = genPassword(data.password)
        const salt = password.salt
        const hash = password.hash
        const username = data.username
        let user = new User()
        user.username = username
        user.hash = hash
        user.salt = salt
        user.marked = false
        user.reffered = []
        const registerUser = await user.save().then((user) => {
            console.log(user)
        })
        res.json({ complete: true })
    } catch (e) {
        res.json({ complete: false })
    }


})

router.post("/login", async (req, res) => {
    const data = req.body
    const password = data.password
    const username = data.username
    try {
        const check = await User.findOne({ username: username })
        hash = check.hash
        salt = check.salt
        const passwordCheck = validPassword(password, hash, salt)
        if (check && passwordCheck) {
            res.json("exists")
        } else {
            res.json("notexists")
        }

    } catch (e) {
        console.log(e)
    }
})

router.delete("/deleteForm", async (req, res) => {
    try {
        const id = req.body.val
        console.log(id)
        await Order.findByIdAndDelete(req.body.val)
        res.status(200)
    }catch(e){
        res.stats(400)
    }
    
})

router.post("/submitForm", async (req, res) => {
    console.log("form submitted")
    const requests = req.body.requests
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const heightFt = req.body.heightFt
    const heightIn = req.body.heightIn
    const weight = req.body.weight
    const gender = req.body.gender
    const city = req.body.city
    const zip = req.body.zip
    const state = req.body.state
    const eyes = req.body.eyes
    const hair = req.body.hair
    const payment = req.body.payment
    const id = req.body.id
    const signature = req.body.signature
    const username = req.body.user
    const dob = req.body.dob
    try {
        let order = new Order()
        order.requests = requests
        order.firstName = firstName
        order.lastName = lastName
        order.heightFt = heightFt
        order.heightIn = heightIn
        order.weight = weight
        order.gender = gender
        order.city = city
        order.zip = zip
        order.state = state
        order.eyes = eyes
        order.hair = hair
        order.payment = payment
        order.id = id
        order.signature = signature
        order.user = username
        order.dob = dob

        const createOrder = await order.save().then((order) => {
            console.log(order)
        })
        res.json({ complete: true })
    } catch (e) {
        res.json({complete: false})
    }
})

router.post("/findForm", async (req,res)=>{
    let forms = await Order.findOne({user: req.body.username})
    res.send(forms)
})

router.delete("/deleteAccount", async (req,res)=>{
    const user = req.body.username
    await Order.deleteMany({user: user})
    await User.deleteOne({username: user})
    res.json({complete: true})
})

module.exports = router