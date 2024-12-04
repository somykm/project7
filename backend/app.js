require('dotenv').config();
const express = require('express');
const path = require('path');
// const bodyParser =require('body-parser');
const userRoutes = require('./routes/user');
const mediaRoutes = require('./routes/media');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

//error handeling
// app.use((err, req, res, next) =>{
//   console.error(err.srack);
//   res.status(500).send('Something went wrong!');
// });


app.use('/api/medias', mediaRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;



