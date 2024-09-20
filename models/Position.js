const mongoose = require('mongoose');


const positionSchema = new mongoose.Schema({
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tecMap', // Référence au modèle User (tecMap)
      required: true
      },
    long : {
        type: Number,
        required:true
      },
      lat : {
        type: Number,
        required:true
      },
   
});

module.exports = mongoose.model('position', positionSchema);