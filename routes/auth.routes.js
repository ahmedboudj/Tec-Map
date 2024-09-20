//External imports
const express = require('express');

// Internal imports
const authControllers = require('../controllers/auth.controllers');

//Variables
const router = express.Router();

// Route
router.route('/login')
      .post(authControllers.login);

router.route('/register')
      .post(authControllers.register);

//Export
module.exports = router;