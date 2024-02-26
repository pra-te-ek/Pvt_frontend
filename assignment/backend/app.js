const express = require("express")
const collection = require("./mongo")
const userModel=require("./mongo")
const cors = require("cors")
const app1 = express()
app1.use(express.json())
app1.use(express.urlencoded({ extended: true }))
app1.use(cors())

/////
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'secret';

////jwtauth
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}




////

const app2 =express()
app2.use(express.json())
app2.use(cors())



app1.get("/",cors(),(req,res)=>{

})


// app1.post("/login",async(req,res)=>{
//     const{email,password}=req.body
//     try{
//         const check = collection.findOne({email:email})
//         // console.log(check)
//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("not exist")
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })

app1.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = collection.findOne({ email: email });
        if (user) {
            const token = jwt.sign({ email: user.email }, jwtSecretKey);
            res.json({ message:"exist",token: token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Server Error' });
    }
});




// app1.post("/signup",async(req,res)=>{
//     const{email,password}=req.body

//     const data={
//         email:email,
//         password:password
//     }

//     try{
//         const check=await collection.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//             await collection.insertMany([data])
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })

app1.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const data = {
        email: email,
        password: password
    };
    try {
        const check = await collection.findOne({ email: email });
        if (check) {
            res.status(400).json("exist");
        } else {
            await collection.insertMany([data]);
            const token = jwt.sign({ email: email }, jwtSecretKey);
            res.json({ message:"notexist",token: token });
        }
    } catch (e) {
        res.status(500).json({ error: 'Server Error' });
    }
});



app1.listen(4000,()=>{
    console.log("port connected on http://localhost:4000/");
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app2.use(authenticateToken)

const PORT  = 4001

// read
// ​ http://localhost:4001/
app2.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true , data : data})
})  


//create data || save data in mongodb
//http://localhost:/create
/*

*/
app2.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, message : "data save successfully" , data : data})
})

//update data 
// http://localhost:/update
/**

 */

app2.put("/update",async(req,res)=>{
    console.log(req.body)
    const { _id,...rest} = req.body 

    console.log(rest)
    const data = await userModel.updateOne({ _id : _id},rest)
    res.send({success : true, message : "data update successfully", data : data})
})

//delete api
// http://localhost:/delete/id
app2.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, message : "data delete successfully", data : data})
}) 

app2.listen(PORT,()=>{
    console.log(`port connected on http://localhost:${PORT}/`);
})
