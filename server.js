const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
//Connecting database
connectDB();

// //Init Middleware
app.use(express.json({ extended: false })); //For the body parser

//Welcome Route
app.get('/', (req, res) => res.send({ msg: 'Welcome to the LateGram API' }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/comments', require('./routes/comments'));

//Listening PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
