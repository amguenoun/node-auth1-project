require('dotenv').config()

const express = require('express');

const server = express();

const userRouter = require('./resources/users/usersRouter');

server.use(express.json());
server.use('/api', userRouter)

module.exports = server