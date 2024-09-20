const User = require('../models/User');
const Position = require('../models/Position');
//external import :
const authUtils= require('../utils/auth.utils');

exports.getFriendsPositions = async (req, res) => {
    const isValidToken = authUtils.protect(req);
    if (!isValidToken) {
        return res.status(401).send('Not authorized');
    }

    const userId = req.userId;

    try {
        // Récupérer l'utilisateur actuel pour obtenir ses amis
        const currentUser = await User.findById(userId).populate('friends');
        console.log(currentUser);

        // Récupérer les positions des amis
        const friends = currentUser.friends;
        console.log(friends);
        const friendsPositions = [];
        for (const friend of friends) {
            const friendPosition = await Position.findOne({ user: friend._id });
            
            if (friendPosition) {
                friendsPositions.push({
                    userId: friend._id,
                    lat: friendPosition.lat,
                    long: friendPosition.long
                });
            }
        }
        console.log("ma"+friendsPositions);
        res.status(200).json(friendsPositions);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.updatePosition = async (req, res) => {
    const isValidToken = authUtils.protect(req);
    if (!isValidToken) {
        return res.status(401).send('pas de permission');
    }

    const userId = req.userId;
    const { long, lat } = req.body;
    if (long === undefined || long.trim() === '') {
        return res.status(400).send('use a valid longitude');
    }
    if (lat === undefined || lat.trim() === '') {
        return res.status(400).send('use a valid atitude');
    }

    try {
        
        const user = await User.findById(userId);

        
        let position = await Position.findOne({ user: userId });

        if (!position) {
           
            position = new Position({
                long,
                lat,
                user: userId
            });
        } else {
         
            position.long = long;
            position.lat = lat;
        }

      
        await position.save();

        
        user.position.push(position);
        await user.save();

        res.status(200).send('Position mise à jour avec succès');
    } catch (error) {
        res.status(500).send(error.message || 'Erreur interne du serveur');
    }
};