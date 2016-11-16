/**
 * Created by Mr.t Notebook on 11/15/2016.
 */
var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var timestamp = moment.valueOf();

app.use(express.static(__dirname + '/public'));

var clientInfo = {};


// Send current users to provided socket

function sendCurrentUsers(socket) {

    var info = clientInfo[socket.id];
    var users = [];



    if (typeof info === 'undefined') {
        return;
    }

    Object.keys(clientInfo).forEach(function (socketId) {

        var userInfo = clientInfo[socketId];

        if (info.room === userInfo.room) {
            users.push(userInfo.name);

        }

    });

    console.log(users.join(', '));


    socket.emit('message', {
        name: 'System',
        text: 'Current users: ' + users.join(', '),
        timestamp : timestamp
    });

}

io.on('connection', function (socket) {
    console.log('User connected via socket.io! ');

    socket.on('disconnect', function () {

        var userData = clientInfo[socket.id];
        if(typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {

                name: 'System',
                text: userData.name + ' has left!',
                timestamp: timestamp

            });
            delete clientInfo[socket.id];
        }

    });

    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {

            name: 'System',
            text: req.name + ' has joined!',
            timestamp: timestamp
        });

    });

    socket.on('message', function (message) {

        console.log('Message received:' + message.text);

        if (message.text === '@currentUsers') {
            sendCurrentUsers(socket);

        } else {

            message.timestamp = moment().valueOf();
            //Send to everyone including self
            io.to(clientInfo[socket.id].room).emit('message', message);

            // Send to everybody but sender
            // socket.broadcast.emit('message', message);
        }


    });

    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application!',
        timestampe: timestamp
    });

});
http.listen(PORT, function () {

    console.log('Server Started');

});
