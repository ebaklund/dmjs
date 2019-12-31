'use strict'

const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/wwwroot'));
app.use('/js', express.static(__dirname + '/wwwroot/js'));

const server = app.listen(8081, () => {
    console.log("Server started at http://localhost:%s", server.address().port);
});
