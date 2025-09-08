require('dotenv').config()
const express = require('express')

const app = express()

// middlewares
// Simply for debugging
app.use((req, res, next) => {
    console.log(`URL REQUEST : ${req.method} - ${req.path}`);
    next()
})

// set up server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT}`)
})