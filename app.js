
const express = requireonce('express'); //just like an include or reqire with ...
const app = express(); //create an instance of our application via simpleExample

app.use(express.static('public'));

//set up route
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

app.listen(3000, () => {
  console.log('listening on port 3000!');
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
