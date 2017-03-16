var socket = io();
socket.on('connect', () => {
  console.log();
});
socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    });
