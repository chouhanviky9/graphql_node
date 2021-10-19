const { Sequelize, DataTypes } = require('sequelize');
const {sequelize}=require('../config/database');


const book=sequelize.define('book', {
    name:{
        type:DataTypes.STRING
    },
    genre:{
        type:DataTypes.STRING
    },
    id:{
        type:DataTypes.STRING,
        primaryKey: true
    },
    authorId:{
        type:DataTypes.STRING
    }
})


module.exports={book};



