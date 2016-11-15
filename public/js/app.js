/**
 * Created by Mr.t Notebook on 11/15/2016.
 */
var socket = io();
socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});