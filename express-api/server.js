const express = require('express')
const cors = require('cors')
const mysql = require('mysql2');
const port = 5050

// dbconnect
const sequelize = require('./db.config')
sequelize.sync().then(res => {
    console.log('database aman brad')
})


// routes
const userEndpoint = require('./routes/user')
const absensiEndpoint = require('./routes/absensi')


const app = express();
app.use(cors())
app.use(express.json())


app.use('/user', userEndpoint)
app.use('/absensi', absensiEndpoint)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})


