//internal import
const User = require('../models/User');
//external import :
const jwt = require('jsonwebtoken');



//Route POST/auth/login :
exports.login = async(req, res) => {

    // 0. recup email et pass du body
    const { email , password} = req.body;


     // 1. verifie si email et le mot de passe sont valide ou non
    if (email === undefined || email.trim() === '') {
        return res.status(400).send('invalid email');
    }
    if (password === undefined || password.trim() === '') {
        return res.status(400).send('invalid password');
    }

    // 2. recup l'utilisateur avec l'email, retourner une erreur si non trouvé
    
    const user = await User.findOne({email});
  
    if (user===null) {
        return res.status(401).send('user not found with this email');
    }

    // 3. comparer les mots de passe
    if (user.password !== password) {
        return res.status(401).send('incorrect password');
    }

    // 4. generer et envoyer un token
    const token = jwt.sign({'id': user.id},'ahmed');

    //  réponse si tout se passe bien
    res.status(200).send(token);
};



//Route POST/auth/register :

exports.register = async (req, res) => {

    const { email,password,username,fullname } = req.body;
        
       // 1. verifie si email et password et username valid : 
        if (email === undefined || email.trim() === '') {
            return res.status(400).send('use a valid email');
        }
        if (password === undefined || password.trim() === '') {
            return res.status(400).send('use a valid password');
        }
        if (username === undefined || username.trim() === '') {
            return res.status(400).send('use a valid username');
        }
        if (fullname === undefined || fullname.trim() === '') {
            return res.status(400).send('use a valid fullname');
        }
        
        // 2.Vérifier si l'email existe déjà
        try {
            const existingUser = await User.findOne({ email });
    
            if (existingUser) {
                return res.status(409).send('User already exists with this email');
            }
    
            // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
            const newUser = await User.create(req.body);
    
            // Générer un token pour le nouvel utilisateur
            const token = jwt.sign({ id: newUser.id }, 'ahmed');
    
            // Répondre avec le token en cas de succès
            res.status(201).send(token);
        } catch (error) {
          
            res.status(500).send(error.message);
        }
};
