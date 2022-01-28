const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const userSchema =  new Schema({
    userID:{
        type:String,
        required:true
    },
    userFullName:{
        type:String,
        required:true
    },
    userAddress:{
        type:String,
        required:true
    },
    userNumber:{
        type:String,
        required:true
    },
    userGender:{
        type:String,
        required:true
    }
    //,
    //userImage:{
    //    type:String
   // },
    //postdata:{
    //    type:Date,
    //    default:Date.now
   // }

})

const user = mongoose.model("User",userSchema);

module.exports=user;