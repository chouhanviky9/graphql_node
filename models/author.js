const { Sequelize, DataTypes } = require('sequelize');
const {sequelize}=require('../config/database');

const author=sequelize.define('author',{
    name:{
        type:DataTypes.STRING
    },
    age:{
        type:DataTypes.INTEGER
    }
  }
)



module.exports={author}

