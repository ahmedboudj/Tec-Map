
//extrnal imports
const express = require('express');

//variables
const router = express.Router();  

//internal import
const meControllers = require('../controllers/me.controllers');

// Route
router.route('')
      .put(meControllers.updateUser)
      .get(meControllers.getUser)
      .delete(meControllers.deleteUser);

// export
module.exports= router;