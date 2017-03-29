var socket = io();
socket.on('connect', () => {
  console.log();
});
console.log(socket);
socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    });

var $getUser = () => {
  var user = {
    name : $('user')
  }
}

$('#like').click(() =>{
  socket.emit('likeUser', {'user': "moi", 'like' : 'elle'});
})

function maPosition(position) {
  socket.emit('newPosition', {'lat': position.coords.latitude, 'lon': position.coords.longitude})
}

if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition(maPosition);
