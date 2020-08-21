require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const folderRouter = require( './folders/folders-router' )
const noteRouter = require( './notes/notes-router' )

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use( '/api/folders', folderRouter )
app.use( '/api/notes', noteRouter )


app.use(errorHandler)

module.exports = app