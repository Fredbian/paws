// import moduels
require('dotenv').config();
const sequelize = require('../config/connection')
const userSeed = require('./userSeed')
const petSeed = require('./petSeed')


const seed = async () => {
    await sequelize.sync({force: true})

    await userSeed(); // promise
    console.log(`USER SEED ADDED!`)

    await petSeed()
    console.log(`BLOG SEED ADDED!`)

    process.exit(0)    
}

seed()