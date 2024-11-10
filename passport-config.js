const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) { 
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, {message : "Email or password incorrect"})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: "Email or password incorrect"})
            }
        } catch (e){
            return done(e)
            }
    } 

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser)) // on utilise le mail pour se connecter
    passport.serializeUser((user, done) => done(null, user.id)) // on stocke l'id de l'utilisateur
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id)) // on récupère l'id de l'utilisateur
    })
}
 
module.exports = initialize // on exporte la fonction initialize pour l'utiliser dans server.js