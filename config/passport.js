const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport){
    passport.use(
        new GoogleStrategy(
            {
                clientID:process.env.GOOGLE_CLIENT_ID,
                clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                // OLD: Localhost or relative callback URL
//                 callbackURL:'/auth/google/callback'
                // NEW: Full deployed Render callback URL
                callbackURL:'https://sakshi-chakre-storyvault.onrender.com/auth/google/callback'
            },
            async(accessToken, refreshToken, profile, done) => {
                // console.log(profile)
                const newUser={
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName || '',
                    image: profile.photos[0].value
                    
                }
                //storing the user
                try{
                    let user = await User.findOne({googleId:profile.id})

                    if(user){
                        done(null,user)
                    }else{
                        user = await User.create(newUser)
                        done(null,user)
                    }
                }catch(err){
                    console.log(err)
                }
            }
        )
    )
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    // passport.deserializeUser((id,done)=>{
    //     User.findById(id,(err,user)=>done(err,user))
    // })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch (err) {
            done(err, null)
        }
    })
}