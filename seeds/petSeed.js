// import moduels
const { Pet } = require('../models')

// prepare data
const petData = [
    {
        typeOfPet: 'Cat',
        name: 'Tigger',
        breed: 'Bengal Cat',
        age: 1,
        gender: 'Female',
        description: 'good cat',
        location: 'Melbourne',
        user_id: 1        
    },
    {
        typeOfPet: 'Dog',
        name: 'Luck',
        breed: 'Golden Retriever',
        age: 2,
        gender: 'Male',
        description: 'good dog',
        location: 'Melbourne',
        user_id: 1  
    },
    {
        typeOfPet: 'Cat',
        name: 'Lucky',
        breed: 'American Shorthair',
        age: 1,
        gender: 'Male',
        description: 'good cat',
        location: 'Sydney',
        user_id: 2  
    },
    {
        typeOfPet: 'Dog',
        name: 'Benny',
        breed: 'Spitz',
        age: 1,
        gender: 'Male',
        description: 'good dog',
        location: 'Sydney',
        user_id: 2  
    },
];

// bulk create data
const petSeed = () => {
  return Pet.bulkCreate(petData)
}

// export moduels
module.exports = petSeed

