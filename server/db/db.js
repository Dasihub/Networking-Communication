require('dotenv').config()
const {Pool} = require('pg')

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
})

db.connect(err => {
    if (err) {
        return console.log(`Error ${err}`)
    }
    console.log('Connect db postgresql')
})

module.exports = {db}