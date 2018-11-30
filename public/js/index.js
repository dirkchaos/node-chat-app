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

// newLocationMessage Event Listener
socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});



var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text("Sending location...");

  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position);
    locationButton.removeAttr('disabled').text("Send location");
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});
