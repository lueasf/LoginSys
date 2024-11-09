const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('./passport-config')

const initializePasseport = require('./passport-config')
initializePasseport(passport)


const users = []


app.set('view engine', 'ejs') // mettre la vue ejs
app.use(express.urlencoded({extended: false})) // pour récupérer les données du formulaire


app.get('/', (req, res) => {
    res.render('index.ejs', {name: "Luc"})
})


app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, res) => {
    res.render('login.ejs')
})


app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    try {
    const hashedpw = await bcrypt.hash(req.body.password, 10) // 10 = bon stdard pour la sécu
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email : req.body.email,
        password: hashedpw
    })
    res.redirect('/login')
    } catch  {
        res.redirect('/register')
    }
    console.log(users)
})

app.listen(3000)

