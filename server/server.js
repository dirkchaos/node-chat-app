const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);

// Adding things to deploy in heroku
const port = process.env.PORT || 3000;

var app = express();

// Configure express to work with http because we will use it to add socket.io support
var server = http.createServer(app);

// Configure our http (Above) to use Sockets & WebSockets
var io = socketIO(server);

// Register an Event Listener
// Connection Event
io.on('connection', (socket) => {
  console.log('New User Connected '+socket);

  // Creating and Emiting Custom Events
  /*socket.emit('newEmail', {
    from: 'dell@dell.com',
    text: 'Hey, what\'s up ?',
    createdAt: 123
  });*/

  // Creating Custom Event Listener
  /*socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });*/


  // Emit newMessage Event
  socket.emit('newMessage', {
    from: 'dell',
    text: 'hey, HP.',
    createdAt: 1231321313
  });

  // createMessage Listener
  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);
  });



  // Disconnection Event
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// Setting up the Middleware
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started app on port ${port}`);
});
