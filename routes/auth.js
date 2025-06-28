const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
// OLD: Only profile scope
// router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
// NEW: Profile and email scope
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
// OLD: Typo in failureRedirect
// router.get('/google/callback', passport.authenticate('google', { faliureRedirect: '/' }), (req, res) => { res.redirect('/dashboard'); });
// NEW: Correct failureRedirect spelling
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard')
    }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('/')
  })
})

module.exports = router