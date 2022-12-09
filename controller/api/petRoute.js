// import modules
const router = require('express').Router()
const { User, Pet } = require('../../models')
const withAuth = require('../../utils/auth')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// GET all pets
router.get('/', (req, res) => {
    Pet.findAll({
        // Get all pets info include user info
        include: [
            {
                model: User,
                attributes: ['username', 'email', 'phoneNumber']
            },
        ]
    })
        // return pets data
        .then((petData) => res.status(200).json(petData))
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/:id', (req,res) =>{
    Pet.findOne({
        where: { id: req.params.id },      
        include: [
        {
            model: User,
            attributes: ['username', 'email', 'phoneNumber']
        },
    ]})
    .then((petData) => {
        res.status(200).json(petData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})




// GET pets by user search input ------------- not completed yet
router.get('/search',
     withAuth,  
    (req, res) => {
        Pet.findAll({
            where: {
                typeOfPet: req.body.typeOfPet,
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'email', 'phoneNumber']
                },
            ]
        })
            .then(petData => {
                // if not found, return message
                if (!petData) {
                    return res.status(404).json({ message: 'Cannot found any pets!' })
                }
                // else, return data
                res.status(200).json(petData)
            })
            // handle err
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    })






// Create a new pet
router.post('/',
     withAuth,  
    (req, res) => {
        Pet.create({
            typeOfPet: req.body.typeOfPet,
            name: req.body.name,
            breed: req.body.breed,
            age: req.body.age,
            gender: req.body.gender,
            description: req.body.description,
            location: req.body.location,
            user_id: req.session.user_id
        })
            // if no err, return data
            .then(petData => res.status(200).json(petData))
            // handle err
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    })


// Update a pet
router.put('/:id',
     withAuth, 
    (req, res) => {
        Pet.update(
            {
     
                age: req.body.age,
                description: req.body.description,
                location: req.body.location,
                user_id: req.session.user_id
            },
            {
                where: { id: req.params.id }
            })
            .then(petData => {
                
                res.status(200).json({data: 'ok'})
            })
            // handle err
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    })


// DELETE a pet
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
                console.log(err)
                res.status(500).json(err)
            })
})

router.post('/enquire', (req,res) => {
    const {email,message} = req.body;
    if(email && message){
        const emailMessage = {
            email,
            message
        }

        var mail = {
            from:'pawsforhomes2022@gmail.com',
            to:`${email}`,
            subject: "Pet Enquiry",
            text: `${message}`
        }

        transporter.sendMail(mail, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        

        const response = {
            status: 'success',
            body: emailMessage,
        };
        console.log(response);
        res.status(201).json(response);
    }
})

module.exports = router