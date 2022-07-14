const express = require('express')
const PORT  = process.env.PORT || 8080
const cors = require('cors')
const app = express()
const routes = require('./routes/index.js')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)



app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
})

