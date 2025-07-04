const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

connectToDb(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/users', userRoutes);
app.use('/captain', captainRoutes);


module.exports = app;
