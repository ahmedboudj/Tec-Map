// External imports
const express = require('express');

// Internal import
const positionControllers = require('../controllers/position.controllers');

//Variables
const router = express.Router();

// Routes
router.route('')
      .put(positionControllers.updatePosition);

router.route('/friends')
      .get(positionControllers.getFriendsPositions);


//Export
module.exports = router;