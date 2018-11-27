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
});
