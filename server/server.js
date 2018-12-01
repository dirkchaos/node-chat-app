const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js')
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);

// Adding things to deploy in heroku
const port = process.env.PORT || 3000;

var app = express();

// Configure express to work with http because we will use it to add socket.io support
var server = http.createServer(app);

// Configure our http (Above) to use Sockets & WebSockets
var io = socketIO(server);

var users = new Users();

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
  /*socket.emit('newMessage', {
    from: 'dell',
    text: 'hey, HP.',
    createdAt: 1231321313
  });*/


  // soket.emit from Admin to Welcome to the chat app
  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // socket.broadcast.emit from Admin text New user joined
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // Join Listener
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    // socket.leave(params.room);==========>Leave the chat Room
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // Emit an event that a new user joined in
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // io.emit=====>io.to('Room_Name')
    // socket.broadcast.emit========>socket.broadcast.to('Room_Name').emit
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));



    callback();
  });


  // createMessage Listener
  // Broadcasting Event
  // Adding Acknowledgement by adding callback()
  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg);

    // ************Send event to all users + {Sender}************
    io.emit('newMessage', generateMessage(msg.from, msg.text));

    // ************Acknowledgement************
    callback();

    // ************Send event to all users + {Sender}************
    /*socket.broadcast.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt : new Date().getTime()
    });*/


  });


  // Geolocation Message Reciever
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  // Disconnection Event
  socket.on('disconnect', () => {
    // Update the users list
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

// Setting up the Middleware
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started app on port ${port}`);
});
