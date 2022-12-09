const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model{
    passwordCheck(login){
        return bcrypt.compareSync(login,this.password)
    }
}

User.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // username
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [8]
        }
    }
},
{
   hooks: {
    beforeCreate: async (newData) => {
        newData.password = await bcrypt.hash(newData.password, 10);
        return newData;
    }
   },
   sequelize,
   timestamps: false,
   freezeTableName: true,
   underscored: true,
   modelName: 'user'
}
);

module.exports = User;