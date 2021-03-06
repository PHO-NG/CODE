require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10


const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema)

app.get('/', (req,res) => {
    res.render('home') 
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('login', (req,res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({email: username}, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    res.render("secrets")
                }
            })
            
            
        }
    })
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.post('/register', (req,res) => {

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newUser = new User({
            email: req.body.username,
            password: hash
        })
        newUser.save((err) => {
            if (!err) {
                res.render('secrets');
            }
        })
    })
    
})


app.listen(3000, () => {
    console.log("Server started!")
})

