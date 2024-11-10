if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config() // charge les var d'env
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePasseport = require('./passport-config')
initializePasseport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id )
)

const users = []

app.set('view engine', 'ejs') // mettre la vue ejs
app.use(express.urlencoded({extended: false})) // pour récupérer les données du formulaire
app.use(flash())
app.use(session({
    secret: process.env.SEC,
    resave : false,
    saveUninitialized : false // sauvegarder que des valeurs init
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.get('/', checkAuth, (req, res) => {  // checkAuth = middleware pour vérifier si l'utilisateur est connecté
    res.render('index.ejs', { name: req.user.name })
})


app.get('/login', checkNotAuth, (req, res) => { // checkNotAuth pour pas aller sur /login si deja co
    res.render('login.ejs')
})

app.post('/login', checkNotAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true // message explicant l'action
}))


app.get('/register', checkNotAuth, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuth, async (req, res) => {
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


app.delete('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});


// verifier si l'utilisateur est connecté
function checkAuth(req, res, next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


// pour pas login pls fois par ex
function checkNotAuth(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(3000)

