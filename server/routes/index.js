const express = require('express')

const app = express()

app.use('/auth', require('./authRoute'))
app.use('/', require('./workingRoute'))

module.exports = app