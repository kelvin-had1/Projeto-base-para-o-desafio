const express = require('express')
const router = express.Router()
const user = require('../class/user.js')
const book = require('../class/book.js')


router.route('/usuarios')
    .get((req, res) => {
        let User = new user()
        User.getUsers(req, res)
    })

router.route('/cadastrar/usuario')
    .post((req, res) => {
        let User = new user(req.body.email, req.body.password, req.body.name)
        User.insertUser(req, res)
    })

router.route('/cadastrar/livro')
    .post((req, res) => {
        let Book = new book(req.body.name, req.body.dayprice)
        Book.getBooks(req, res)
    })


router.route('/login')
    .post((req, res) => {
        let User = new user(req.body.email, req.body.password)
        User.loginUser(req, res)
    })


module.exports = router