const express = require('express');
const registerUser = require('../Controller/userController');

const route = express.Router();

route.post('/registerUser', registerUser);

// export the configured router so it can be used by the main application
module.exports = route;
