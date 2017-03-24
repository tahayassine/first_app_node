var socket = io();
socket.on('connect', () => {
  console.log();
});
console.log(socket.id);
socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    });

$('#like').click(() =>{
  socket.emit('likeUser', {'user': "moi", 'like' : 'elle'});
})
