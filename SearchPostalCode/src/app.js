'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const SearchPostalCodeRoutes = require('./routes/SearchPostalCodeRoutes')
const path = require('path')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/v1/postalCode', SearchPostalCodeRoutes)

module.exports = app
