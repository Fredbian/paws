// import moduels
const { User } = require('../models')

// prepare data
const userData = [
    {
        username: 'Test1',
        phoneNumber: 111111111,
        email: 'test1@mail.com',
        password: '12345'
    },
    {
        username: 'Test2',
        phoneNumber: 111111111,
        email: 'test2@mail.com',
        password: '12345'
    },
    {
        username: 'Test3',
        phoneNumber: 111111111,
        email: 'test3@mail.com',
        password: '12345'
    },
];

// bulk create data
const userSeed = async () => {
  
  await User.bulkCreate(userData, {
    individualHooks: true, // to trigger before save hook
  });
}

// export moduels
module.exports = userSeed