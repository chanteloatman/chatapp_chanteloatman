
const express = require('express'); //just like an include or reqire with ...
const app = express();
const io = require('socket.io')();


app.use(express.static('public'));

//set up routes
app.use(require('./route/index'));
app.use(require('./route/contact'));
app.use(require('./route/users'));

const server = app.listen(3000, () => {
  console.log('listening on port 3000!');
});

io.attach(server);

io.on('connection', (socket) => {
  console.log('a user has connected!');
  io.emit('chat message', { for: 'everyone', message : `${socket.id} is here`});

  //handle messages sent from the client
  socket.on('chat message', msg => {
  io.emit('chat message', { for: 'everyone', message : msg});
});

socket.on('disconnect', () => {
  console.log('a user has disconnected!');

  io.emit('disconnect message', `${socket.id} has left the building!`);
});

});



/*const express = require('express');
const app = express();

//this is a route. this points to home page / root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//set up a contact route
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

//set up a portfolio route
app.get('/portfolio', (req, res) => {
  res.sendFile(__dirname + '/portfolio.html');
});

//to get app running
app.listen(3000, () => {
  console.log('app running on port 3000!');
});*/
