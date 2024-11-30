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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

//error handeling
app.use((err, req, res, next) =>{
  console.error(err.srack);
  res.status(500).send('Something went wrong!');
});
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, ()=> {
//   console.log(`Server is running on port ${PORT}`);
// });

// app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;



