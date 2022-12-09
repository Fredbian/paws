const router = require('express').Router()
const api = require('./api')
const myAccountRoute = require('./myAccountRoute')
const homeRoute = require('./homeRoute')

// path for all APIs
router.use('/api', api)

// path for home page
router.use('/', homeRoute)

// path for myaccount
router.use('/myaccount', myAccountRoute)

// 404 page
router.use((req, res) => res.status(404).end())

module.exports = router