/**
 * Created by mark on 21/03/15.
 */
/// <reference path="typings/tsd.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import todos = require('./todos');
import data = require('./data');

var app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.use('/api/todos', <express.IRouter<data.ToDo>>todos);

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
