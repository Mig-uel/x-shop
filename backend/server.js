const express = require('express')
const colors = require('colors')

const port = 5000
const app = express()

app.get('/', (req, res) => {})

app.listen(port, () => console.log(`SERVER STARTED ON PORT: ${port}`.magenta))
