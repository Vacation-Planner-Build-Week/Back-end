const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router');
const vacationsRouter = require('../vacations/vacations-router');
const datesRouter = require('../dates/dates-router');
const commentsRouter = require('../comments/comments-router');
const activitiesRouter = require('../activities/activities-router');
const messagesRouter = require('../messages/messages-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/vacations', authenticate, vacationsRouter);
server.use('/api/dates', authenticate, datesRouter);
server.use('/api/comments', authenticate, commentsRouter);
server.use('/api/activities', authenticate, activitiesRouter);
server.use('/api/messages', authenticate, messagesRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: 'Api running'});
});

module.exports = server;
