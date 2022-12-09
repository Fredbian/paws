// import modules
const router = require('express').Router()
const { User, Pet } = require('../../models')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// GET all User
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => {
            //if found, return data
            res.status(200).json(userData)
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// GET User by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            {
                model: Pet,
            }
        ]
    })
        .then(userData => {
            // if not found, show message
            if (!userData) {
                return res.status(404).json({ message: 'Cannot found user with this id!' })
            }
            // else return data
            res.status(200).json(userData)
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// Create a new User when sign up
router.post('/', (req, res) => {
    User.create({
        username:req.body.username,
        phoneNumber: req.body.phoneNumber,
        email:req.body.email,
        password: req.body.password
    })
        .then(userData => {
            // user data to session
            req.session.save(() => {
                req.session.user_id = userData.id
                req.session.username = userData.username
                req.session.phoneNumber = userData.phoneNumber
                req.session.email=userData.email
                req.session.loggedIn = true
                res.status(200).json(userData)
            })
            var mail = {
                from:'pawsforhomes2022@gmail.com',
                to:`${userData.email}`,
                subject: "Thanks for signing up!",
                text:"Welcome to Paws for Homes. We hope that whether you are looking for a pet or a new home for one, that you have a great experience with us."
            }
            transporter.sendMail(mail, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// login validation
router.post('/login', (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then(userData => {
            // Validate username
            if (!userData) {
                return res.status(400).json({ message: 'Incorrect Email or Password!' })
            }

            // Validate password
            const password = userData.passwordCheck(req.body.password)

            // if password not match, show message
            if (!password) {
                return res.status(400).json({ message: 'Incorrect Email or Password!' })
            }
            // else, validate data and login
            req.session.save(() => {
                req.session.user_id = userData.id
                req.session.email = userData.email
                req.session.username = userData.username
                req.session.phoneNumber = userData.phoneNumber
                req.session.loggedIn = true
                res.status(200).json({
                    user: userData,
                    message: 'LOGIN SUCCESS!'
                })
            })
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// log out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }        
})

module.exports = router