/**
 * Created by Mr.t Notebook on 11/15/2016.
 */
var socket = io();
socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {

    console.log('New message:' );
    console.log(message.text);

    // var app = new Vue({
    //     el: '#app',
    //     data: {
    //         message: message.text
    //     }
    // })

});

// Handles submitting of new message
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault();
    var message = $form.find('input[name=message]');
    socket.emit('message', {
        text: message.val()
    });
    message.val('');
});