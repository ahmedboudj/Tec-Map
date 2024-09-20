
const mongoose = require('mongoose');


const tecMapShema = new mongoose.Schema({
    username : {
        type: String,
        required:true
      },
      fullname : {
        type: String,
        required:true
      },
    email : {
         type:String,
         unique:true,
         required:true
       
    },
  password:{
       type:String,
       required:true
    },

  isAdmin:{
    type:Boolean,
    default: false

  },
  friends:[{
    type:mongoose.Schema.ObjectId,
    ref:'tecMap',
    default: []
  }],
  position:[{
    type:mongoose.Schema.ObjectId,
    ref:'position'
  }]

});

module.exports = mongoose.model('tecMap', tecMapShema);