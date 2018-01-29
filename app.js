
const express = require('express'); //just like an include or reqire with ...
const app = express(); //create an instance of our application via simpleExample
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
  io.emit('connectMsg', { for: 'everyone', msg : `${socket.id} is here`});

socket.on('disconnect', () => {
  console.log('a user has disconnected!');
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
