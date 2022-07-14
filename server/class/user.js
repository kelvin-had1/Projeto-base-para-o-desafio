const bcrypt = require('bcryptjs');   
const { json } = require('body-parser');
const { DataTypes } = require("sequelize");
const db = require('./db.js')
const jwt = require('jsonwebtoken')
const config = require('./../config.json')

module.exports = class User{
    
    constructor(email = '', password = '', name = ''){
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(password, salt)
        
        this.email = email
        this.password = hash
        this.name = name       
        
        this.User = db.define('usuarios', {            
            nomeusuario: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            pswd: {
                type: DataTypes.TEXT,
                allowNull: false
            }

        })
        
    }

    
    async getUsers(req, res){
        try {
            let users = await this.User.findAll()
            return res.send(JSON.stringify(users, null, 2))
        } catch (error) {            
            return res.send({erro: "erro inesperado!"})
        }
        
        
    }

    async insertUser(req, res){
        try {
            await db.sync()        
            const user = this.User.create({ nomeusuario: this.name, email: this.email, pswd: this.password})        
            return res.send({message: "OK"})    
        } catch (error) {             
            console.log(error)
            return res.status(401).send({erro: "Unexpected error"})                                
                                    
        }   
                 
    }

    async loginUser(req, res){
        try {
            let profile = await this.User.findAll({
                where: {email: this.email}
            })
            let password = profile[0].pswd
            bcrypt.compare(req.body.password, password, (err, result)=>{
                if(err){
                    return res.status(401).send({erro: "Unexpected error"})                                
                }

                if(result){
                    const token = jwt.sign({
                        userName: profile[0].nomeusuario,
                        email: profile[0].email
                    }, config.JWT_KEY, {
                        expiresIn: "2 days"
                    })
                    return res.status(200).send({message: "OK", token: token})
                }else{
                    return res.status(401).send({erro: "Unexpected error"})                                
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(401).send({erro: "Unexpected error"})                                            
        }
    }
    
    
}