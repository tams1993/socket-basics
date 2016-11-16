/**
 * Created by Mr.t Notebook on 11/15/2016.
 */
var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
io.on('connection', function (socket) {
    console.log('User connected via socket.io! ');

    socket.on('message', function (message) {

        console.log('Message received:' + message.text);

        message.timestamp = moment().valueOf();
        //Send to everyone including self
        io.emit('message', message);

        // Send to everybody but sender
        // socket.broadcast.emit('message', message);
    });

    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application!',
        timestampe: moment().valueOf()
    });

});
http.listen(PORT, function () {

    console.log('Server Started');

});
