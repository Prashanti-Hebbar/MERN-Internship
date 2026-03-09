const express = require('express');
const {registerUser, getUser, getUserById, deleteUserById, updateUser} = require('../Controller/userController');

const route = express.Router();

route.post('/registerUser', registerUser);
route.get('/getUser', getUser);
route.get('/getUserById/:id', getUserById); // we are using :id to get the user by id from the database
route.delete('/deleteUserById/:id', deleteUserById) // we are using :id to delete the user by id from the database
route.put('/updateuser/:id', updateUser) // we are using :id to update the user by id from the database

// export the configured router so it can be used by the main application
module.exports = route;
