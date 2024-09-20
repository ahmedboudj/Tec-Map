//internal import
const User = require('../models/User');

//external import 
const authUtils= require('../utils/auth.utils');

exports.addFriends = async (req, res) => {
    const isValidToken = authUtils.protect(req);
    if (!isValidToken) {
        return res.status(401).send('No permitted');
    }
    const friendId = req.params.friendId;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        const friendUser = await User.findById(friendId);
        
        if (!friendUser) {
            return res.status(404).send('Personne inexistante');
        }

        // Vérifier si l'ami est déjà dans la liste d'amis de l'utilisateur
        const isFriendAlreadyAdded = user.friends.includes(friendId);
        if (isFriendAlreadyAdded) {
            return res.status(409).send('L_ami est déjà présent dans la liste');
        }

        // Vérifier si l'utilisateur essaie de s'ajouter lui-même
        if (userId.toString() === friendId) {
            return res.status(409).send('Vous etes en train de vous ajouter vous-même');
        }

        // Ajouter l'ami à la liste d'amis de l'utilisateur
        user.friends.push(friendId);
        await user.save();
        return res.status(200).send("ami ajouter");

    } catch (error) {
        return res.status(500).send(error.message || 'Server intern error');
    }
};



exports.getFriends = async(req,res)=>{

    const isValidToken= authUtils.protect(req);
    if (!isValidToken){
        return res.status(401).send ('no permited');
    }
    const userId = req.userId;
 
    try {
        const user = await User.findById(userId).select('friends -_id').populate('friends','username');
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message || 'Server intern error');
    }

    
};

exports.deleteFriends = async (req, res) => {
    const isValidToken = authUtils.protect(req);
    if (!isValidToken) {
        return res.status(401).send('no permitted');
    }
    const friendId = req.params.friendId;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        const friendIndex = user.friends.indexOf(friendId);


        if (userId.toString() === friendId) {
            return res.status(409).send('Vous essayez de vous retire');
        }

        
        if (friendIndex !== -1) {
       
            user.friends.splice(friendIndex, 1);
            await user.save();
            return res.send("Un ami a ete supprimé");
        } else {
            return res.status(409).send("L'ami spécifié n'a pas été trouvé dans la liste");
        }

    } catch (error) {
        return res.status(500).send(error.message || 'Server intern error');
    }
};
