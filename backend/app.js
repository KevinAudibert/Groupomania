require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const likeRoutes = require('./routes/like');
const sequelize = require('./config/dbconnect');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
});

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error))

sequelize.sync({ force: true })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use('/api/users/', userRoutes);
app.use('/api/messages/', messageRoutes);
app.use('/api/likes/', likeRoutes);

module.exports = app;