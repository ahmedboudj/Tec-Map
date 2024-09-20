const authUtils  =  require('../utils/auth.utils');
const User       =  require("../models/User");

exports.getUser = async (req,res)=>{

    const isValidToken= authUtils.protect(req);
    if (!isValidToken){
        return res.status(401).send ('no permited');
    }
   try {
       
      const user = await User.findById(req.userId);
     return res.status(200).send(user);
   } catch (error) {
    return res.status(500).send(error.message || 'Erreur interne du serveur');
   }
};
exports.updateUser = async (req,res)=>{
    const email = req.body.email;
    const isValidToken= authUtils.protect(req);
    if (!isValidToken){
        return res.status(401).send ('no update permited');
    }
    try {
        const existingUser = await User.findOne({ email });
        
        if (existingUser && existingUser._id.toString() !== req.userId) {
            return res.status(409).send('Un utilisateur existe déjà avec cet e-mail');
        }

        const filter = { _id: req.userId };

        await User.updateOne(filter, req.body);

        
        return res.status(200).send('Profil mis à jour');
    } catch (error) {
        return res.status(500).send(error.message || 'Erreur interne du serveur');
    }

};

exports.deleteUser = async(req,res)=>{
   
    const isValidToken= authUtils.protect(req);
    if (!isValidToken){
        return res.status(401).send ('no delete permited');
    }
    try {
        const filter = {'_id': req.userId};
        await User.deleteOne(filter);
        res.status(204).send ('profil suprimer');
    } catch (error) {
        return res.status(500).send(error.message || 'Erreur interne du serveur');
    }
};