const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const config = require('config');
const User = require('../models/user')

// JWT STRATEGY GET REQUEST TO DASHBOARD
passport.use(new JwtStrategy({
    // From where is token 
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // Secret from config
    secretOrKey: config.get('jwtSecret')

}, async (payload, done) => {

    try{

        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // If user doesn't exists, handle it and break lines after
        if(!user) return done(null, false);
        // otherwise return user
        done(null, user);
        // user will be req.user

    } catch(error) {
        done(error, false)
    }


}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {

    try {
        // Find user by Email
        const user = await User.findOne({ 
            "local.email": email
        })

        // If not handle it
        if(!user){
            return done(null, false)
        }

        // Check password is correct
        const isMatch = await user.IsValidPassword(password)

        // If not handle it
        if(!isMatch){
            return done(null, false)
        }

        // Otherwise return user
        done(null, user)

    }catch(error){
        done(error, false);
    }


}));

// GOOGLE OAUTH STRATEGY

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.get('googleClientId'),
    clientSecret: config.get('googleClientKey')

}, async (accessToken, refreshToken, profile, done) => {
    try{
            // Check is current user exists in DB
            const existingUser = await User.findOne({'google.id': profile.id});

            if(existingUser) {
                return done(null, existingUser);
            };

            // if new account
            const newUser = new User({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails[0].value
                }
            });

            await newUser.save();
            done(null, newUser);


    }catch(error){
        done(error, false, error.message)
    }


}))


passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.get('facebookClientId'),
    clientSecret: config.get('facebookClientKey')
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ "facebook.id": profile.id })
        if(existingUser) {
            return done(null, existingUser)
        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        })

        await newUser.save();
        done(null, newUser)



    }catch(error){
        done(error, error.message)
    }
}))

