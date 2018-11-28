var socket = io(); // Open up a WebSocket & keep the connection open

// Connection Event
socket.on('connect', () => {
  console.log('Connected to server');

  // Creating Custom Event Listener
  /*socket.emit('createEmail', {
    to: 'hp@dell.com',
    text: 'Hey, sucker'
  });*/

  // Emit createMessage Event
  /*socket.emit('createMessage', {
    to: 'dell',
    text: 'Hey, DELL.'
  });*/

});

// Disconnection Event
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Creating and Listening Events
/*socket.on('newEmail', function (email) {
  console.log('New Email', email);
});*/

// newMessage Event Listener
socket.on('newMessage', function (msg) {
  console.log("new Message = ", msg);

  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  jQuery('#messages').append(li);
});




jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
