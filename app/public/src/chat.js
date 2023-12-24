$(function () {
    const socket = io();

    // Reference to the messages list
    const messages = $('#messages');

    // Reference to the input field
    const inputField = $('#m');

    // Reference to the form
    const form = $('#form');

    // Event listener for form submission
    form.submit(function () {
        socket.emit('chat message', inputField.val());
        inputField.val('');
        return false;
    });

    // Event listener for receiving messages
    socket.on('chat message', function (msg) {
        messages.append($('<li>').text(msg));
        // Scroll to the bottom of the messages list
        messages.scrollTop(messages.prop('scrollHeight'));
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }