const JWT = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');


signToken = user => {
    return JWT.sign({
        iss: 'MERN-V',
        sub: user.id,
        iat: new Date().getTime(), // current Time
        exp: new Date().setDate(new Date().getDate() + 1) // current Time + 1 day
     }, config.get('jwtSecret'));
} 

module.exports = {

    signUp: async (req, res, next) =>{
        
        const { email, password} = req.value.body;
        // Check email is unique
        const foundUser = await User.findOne({ "local.email":email });

        if(foundUser) { 
            return res.status(401).json({serverMsg: "Email is already in use"})
        };

        const newUser = new User({
            method: 'local',
            local: {
                email: email, 
                password: password
            }
            
        });
        await newUser.save();

        // Generate Token
        const token = signToken(newUser);
        
        // Response with token
        res.status(200).json({ token });

    },
    signIn: async (req, res, next) => {
        const { email, password} = req.value.body;
        // Check email is unique
        const foundUser = await User.findOne({ "local.email":email });

        if(!foundUser) { 
            return res.status(401).json({serverMsg: "Email is already in use"})
        };
        
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({token});
        
    },
    googleOAuth: async (req, res, next) => {
        
        const token = signToken(req.user);
        res.status(200).json({token})
    },
    facebookOAuth: async (req, res, next) => {
        // console.log('req.user', req.user)
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({token});
    },
    dashboard: async (req, res, next) => {        
        res.status(200).json({dashboard: 'This message is coming from Server. You are successfully logged in'});
    }
}