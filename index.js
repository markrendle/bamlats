/**
 * Created by mark on 21/03/15.
 */
/// <reference path="typings/tsd.d.ts" />
var express = require('express');
var bodyParser = require('body-parser');
var todos = require('./todos');
var app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use('/api/todos', todos);
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
