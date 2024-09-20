//extrnal imports
const express = require('express');

//variables
const routeur = express.Router();  

//internal import
const userControllers = require('../controllers/user.controllers')

// route
routeur.route('')
       .get(userControllers.user);

//export
module.exports= routeur;