// External imports
const express = require('express');

// Internal import
const friendsControllers = require ('../controllers/freinds.controllers');

//Variables
const router = express.Router();


// Route
router.route('/:friendId')
      .post(friendsControllers.addFriends)
      .delete(friendsControllers.deleteFriends);

router.route('')
      .get(friendsControllers.getFriends)


//Export
module.exports = router;