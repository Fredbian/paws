const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model{

}

Pet.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    typeOfPet: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    breed:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 20,
            min: 0
        }
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
       type: DataTypes.TEXT, 
       allowNull: false
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
           model:'user',
           key:'id'
        }
    }
},
{
   sequelize,
   timestamps: false,
   freezeTableName: true,
   underscored: true,
   modelName: 'pet'
}
);

module.exports = Pet;