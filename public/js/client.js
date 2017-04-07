var socket = io();
socket.on('connect', () => {
  console.log();
});
console.log(socket);
// socket.on('message', function(message) {
//         alert('Le serveur a un message pour vous : ' + message);
//     });

var $getUser = () => {
  var user = {
    name : $('user')
  }
}

$('#like').click(() =>{
  socket.emit('likeUser', {'user': $('#_id').html(), 'like' : $('#_idCart').html()});
  $('.preloader-wrapper').show();
  $('.cart').hide();
})

function maPosition(position) {
  socket.emit('newPosition', {'user': $('#_id').html(),'lat': position.coords.latitude, 'lon': position.coords.longitude})
}

if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition(maPosition);


socket.on('newUser', function(data){
  $('#cartName').html(data.name);
  $('#cartBio').html(data.bio);
  var tags = "";
  console.log(data.interest);
  data.interest.forEach((e)=>{
    console.log(e);
      tags += "<div class=\"chip\">"+e+"</div>";
  })
  $('#cartTag').html(tags);
  $('#cart_id').html(data._id) ;
  $('.cart').show();
  $('.preloader-wrapper').hide();
})
