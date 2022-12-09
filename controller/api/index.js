// import modules
const router = require('express').Router()
const userRoute = require('./userRoute')
const petRoute = require('./petRoute')


// path for users
router.use('/users', userRoute)
// path for pets
router.use('/pets', petRoute)


module.exports = router