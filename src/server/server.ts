'use strict'

import express = require('express');
import { AddressInfo } from 'net';
import path = require('path');

const app = express();

const wwwroot = path.resolve('wwwroot');
console.log('wwwroot:', wwwroot);

app.use('/', express.static(wwwroot));
app.use('/js', express.static(wwwroot + '/js'));
app.use('/patch', express.static(wwwroot + '/js'));

const server = app.listen(8081, () => {
    const port = (server.address() as AddressInfo).port;
    console.log("Server started at http://localhost:%s", port);
});
