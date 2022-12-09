// import modules
const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Pet } = require('../models')
const withAuth = require('../utils/auth')


// GET info and render My Account page
router.get('/',
    withAuth, 
    (req, res) => {
        // all pets
        Pet.findAll({
            where: { user_id: req.session.user_id },
            include: [
                {
                    model: User
                }
            ]
        })
            .then(petData => {
                const pets = petData.map(pet => pet.get({ plain: true }))
                res.render('my-account', {
                    pets,
                    loggedIn: true
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    })


// When click on update btn, rander edit pet page
router.get('/edit/:id', 
 withAuth, 
(req, res) => {
    Pet.findByPk(
        req.params.id,
        {
            include: [
                {
                    model: User
                }
            ]
        }
    )
        .then(petData => {
            // if not found, show message
            if (!petData) {
                return res.status(404).json({ message: 'Cannot found pet by this id!' })
            }
            // else return edit blog page
            const pet = petData.get({ plain: true })
            res.render('edit-pet', {
                pet,
                loggedIn: true
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// When click on delete btn, delete pet info by id
router.delete('/:id', 
 withAuth, 
(req, res) => {
    Pet.destroy({
        where: { id: req.params.id }
    })
        .then(petData => {
            if (!petData) {
                return res.status(404).json({ message: 'Cannot found pet by this id!' })
            }
            res.status(200).json(petData)
        })
        .catch(err => {
            console.log(JSON.stringify(petData))
            res.status(500).json(err)
        })
})



// find pets link
router.get('/find', (req, res) => {
    res.render('find-a-pet')
})


module.exports = router
