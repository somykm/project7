require('dotenv').config();
// const sequelize =require ('../config/database');
const express = require('express');
const path = require('path');
// const bodyParser =require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());


// sequelize.sync().then(()=>{
// console.log('Database synchronized');
// }).catch(error => {
//   console.error('Unable to synchronize database:', error);
// });
//come before routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/mediapost', (req,res,next)=>{
    console.log(res.body);
    res.status(201).json({
      message: 'Post saved successfully'
    });
});
app.get('/api/mediaPost', (req, res, next) => {
  const multiContent = [
    {
      id: 'oeihfzeoi',
      description: 'All of the info about my first thing',
      imageUrl: '',
      userId:'',
    },
    {
      id: 'oeihfzeomoihi',
      
      description: 'All of the info about my second thing',
      imageUrl: '',
      userId:'',
    },
  ];
  res.status(200).json(stuff);
});



app.use('/images', express.static(path.join(__dirname, 'images')));

//error handeling
app.use((err, req, res, next) =>{
  console.error(err.srack);
  res.status(500).send('Something went wrong!');
});


// app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;



