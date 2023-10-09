//routes.js

const UserControllers = require('./controllers/UserControllers');

module.exports = [
    {
        endpoint: '/users',
        method: 'GET',
        handler: UserControllers.listUsers,
    },

    {
        endpoint: '/users/:id',
        method: 'GET',
        handler: UserControllers.getUserbyId,
    },
];