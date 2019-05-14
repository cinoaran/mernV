const router =require('express-promise-router')();

const passport = require('passport');

const passportConfig = require('../../auth-passport/passport');

const { validateBody, validateParams, schemas} = require('../../helpers/routeHelpers');

const AuthController = require('../../controllers/auth');

const passportSignIn = passport.authenticate('local', { session: false })

const passportJWT = passport.authenticate('jwt', { session: false });

const passportGoogle = passport.authenticate('googleToken', {session:false});

const passportFacebook = passport.authenticate('facebookToken', {session:false});


router.route('/signup')
    .post(validateBody(schemas.authSchema),AuthController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, AuthController.signIn);  

router.route('/oauth/google')
    .post(passportGoogle, AuthController.googleOAuth);

router.route('/oauth/facebook')
    .post(passportFacebook, AuthController.facebookOAuth);          

router.route('/dashboard')
    .get(passportJWT, AuthController.dashboard);
    
module.exports = router;