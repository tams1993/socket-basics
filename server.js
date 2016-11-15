/**
 * Created by Mr.t Notebook on 11/15/2016.
 */
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
socket.on('connection', function (socket) {
    console.log('User connected via socket.io! ');

    socket.on('message', function (message) {

        console.log('Message received:' + message.text);

        // Send to everybody but sender
        socket.broadcast.emit('message', message);
    });

    socket.emit('message', {

        text: 'Welcome to the chat application!'

    });

});
http.listen(PORT, function () {

    console.log('Server Started');

});
