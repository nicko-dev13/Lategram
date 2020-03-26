const express = require('express');
const connectDB = require('./config/db');
const app = express();


//Connecting database
connectDB();

//Init Middleware 
app.use(express.json({ extended: false })); //For the body parser 

//Welcome Route
app.get('/', (req, res) => res.send({ msg: 'Welcome to the LateGram API' }));

//Define Routes


//Listening PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));