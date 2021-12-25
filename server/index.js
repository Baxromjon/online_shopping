const express = require('express');
const app = express();
const cors = require('cors')

require('./startup/db')();
require('./startup/routes')(app)

app.use(cors())

app.get('/attendant', function (req, res) {
    res.json({msg: 'It works'})
})


const port = process.env.PORT || 3000;
module.exports = server = app.listen(port, () => {
    console.log(`${port} started hearing the port...`)
})