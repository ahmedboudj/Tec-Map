// internal import:
const User = require('../models/User');
const authUtils= require('../utils/auth.utils');




exports.user = async(req,res) => {
    const isValidToken= authUtils.protect(req);
    if (!isValidToken){
        return res.status(401).send ('n_a pas la permission');
    }

    try {
       const users =await User.find().select('username fullname email');
       res.status(200).send(users);
    } catch (error) {
       res.send(error);
    }
}