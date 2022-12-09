// import modules
const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Pet } = require('../models')

//GET all pets and rander home page
router.get('/', (req, res) => {
    req.session.save()
    Pet.findAll()
        .then(petsData => {
            // map all pets create a array
            const pets = petsData.map(pet => pet.get({ plain: true }))
            // pass all pets to homepage
            res.render('homepage', {
                pets,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// login & sign up link
router.get('/login', (req, res) => {
    // if login success, redirect to home page
    if (req.session.loggedIn) {
        return res.redirect('/myaccount')
    }
    res.render('login')
})

// find a home link
router.get('/new', (req, res) => {
    res.render('find-a-home', { loggedIn: req.session.loggedIn })
})



// find a pet link
router.get('/find', (req, res) => {
    res.render('find-a-pet', { loggedIn: req.session.loggedIn })
})


module.exports = router
