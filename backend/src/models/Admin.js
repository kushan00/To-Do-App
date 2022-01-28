import  mongoose  from "mongoose";

const adminSchema = mongoose.Schema({
    adminID:{
        type:String,
    },
    adminUserName:{
        type:String,
        min:6,
        max:32,
        required:true,
    },
    adminPassword:{
        type:String,
        min:6,max:32,
        required:true
    }
})

export default mongoose.model("Admin",adminSchema)