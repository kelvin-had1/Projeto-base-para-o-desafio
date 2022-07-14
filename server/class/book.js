const { json } = require('body-parser');
const { DataTypes } = require("sequelize");
const db = require('./db.js')
const jwt = require('jsonwebtoken')
const config = require('../config.json')

module.exports = class Book{
    constructor(name = '', dayPrice = 0.0){
        this.name = name
        this.dayPrice = dayPrice
    }

    getBooks(req, res){
        let token = req.body.token        
        res.status(200).send({message: "OK"})
    }
}