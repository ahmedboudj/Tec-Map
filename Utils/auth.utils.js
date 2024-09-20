const jwt = require('jsonwebtoken');
// internal import 
const User = require ('../models/User');
exports.protect=(req) => {

try {
// recuperer le token : 
let token = req.headers.authorization;
console.log(token);

// verifier si le token existe ou nn
if (token===undefined || !token.startsWith('Bearer') ) {
    return false;
}
// enlever le bearer :
token = token.split(' ')[1];
console.log(token);

// decrypter le token :
const decodedToken = jwt.verify(token,'ahmed');
req.userId=decodedToken.id;


return true;

} catch (error) {

    return false;
}
}

exports.isAdmin = (req)=>{

    const userId = req.userId;
 
 // si la personne existe dans la liste 
    const user = User.findById(userId);
if (user === null) {
      return false;
}
// la personne est admin 
if (!user.isAdmin) {
    return false;
}
return true;
}


