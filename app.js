//external  import
const express = require('express');
const mongoose = require('mongoose');

// internal imports :
const authRoute   = require('./routes/auth.routes');
const freindsRoute = require('./routes/freinds.routes');
const meRoute     = require('./routes/me.routes');
const usersRoute   = require('./routes/users.routes');
const positionRoute = require('./routes/position.routes');

// variable 
const app = express();
const PORT = 5004;

const connect = async()=>
{
    try {
    const connexion = await mongoose.connect('mongodb+srv://boudj:AAAaaa111@cluster0.gmgsmih.mongodb.net/');
    console.log("mongoDB connect to : "+connexion.connection.host);
    } catch(error){
        console.log("Erreur de connection a MongoDB: ", error)
    };
}
connect();

 // listner
app.listen(PORT, () => {
    console.log (`listening on port ${PORT}`);
});

// Body Parser :
app.use(express.json());

//Routeurs :
app.use('/auth', authRoute);
app.use('/friends', freindsRoute);
app.use('/me', meRoute);
app.use('/users', usersRoute);
app.use('/position',positionRoute)


