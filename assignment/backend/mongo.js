const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Activity")
.then(()=>{
    console.log("mongodb connected : on mongodb://localhost:27017/Activity");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const schemaData  = mongoose.Schema({
    id : String,
    product : String,
    description : String,
})
const userModel  = mongoose.model("products",schemaData)

const collection = mongoose.model("users",newSchema)

module.exports=collection
module.exports=userModel
