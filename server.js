require('dotenv').config()

const express = require('express');

const server = express();

const session = require('express-session');

const userRouter = require('./resources/users/usersRouter');

const sessionConfig = {
    name: 'firstsess',
    secret: "hello",
    cookie: {
        maxAge: 1000 * 60 * 60, //1 hour
        secure: false, //turn to true in production
    },
    httpOnly: false, //turn to true in production
    resave: false,
    saveUninitialized: false
}

server.use(session(sessionConfig))

server.use(express.json());
server.use('/api', userRouter)

module.exports = server