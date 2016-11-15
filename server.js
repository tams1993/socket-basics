/**
 * Created by Mr.t Notebook on 11/15/2016.
 */
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
socket.on('connection', function () {
    console.log('User connected via socket.io! ');
});
http.listen(PORT, function () {

    console.log('Server Started');
    
});
