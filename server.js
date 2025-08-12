const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://saburu:28032005@myferstdatabase.ral06vq.mongodb.net/?retryWrites=true&w=majority&appName=MyFerstDataBase")
.then(() => {
    console.log("connected successfully");
}).catch((error) => {
    console.log("have error in connect wheth data base" ,error);
});
app.use(express.json());
app.use(express.static('public'));

const user = require("./models/user");
const admin = require("./models/admin");
const produe = require("./models/produe");

app.use(express.urlencoded({extended:true}));

app.get("/" , (req,res) => {
    res.render("sig.ejs");
});
app.get("/log" , (req,res) => {
    res.render("log.ejs");
});
app.get("/sig",(req,res) => {
    res.render("sig.ejs");
})

app.post("/sigin" , async (req,res) => {
    const {email , password} = req.body ;
    try{
       const result = await user.find({email :email  , password:password}) ;
       if(result.length == 0 ){
           res.render("sigFuls.ejs");
       }else{
            const name = result.username;
            res.render("pageShop.ejs" , {name : name});
       };
    }catch{
        res.render("sigFuls.ejs");
        console.log("ereer");
    };
});

app.post("/login" , async (req,res) => {
    const userLog = new user() ;
    userLog.username = req.body.username;
    userLog.email = req.body.email;
    userLog.password = req.body.password;
    try{
       const resultUserName = await user.find({username :userLog.username }) ;
       const resultUserEmail = await user.find({email :userLog.email }) ;
       
       if(resultUserName.length > 0){
            
            res.render("logFuls.ejs" ,{Case:"usernsme"} );
            
            
       }else{
           if (resultUserEmail.length > 0) {
            
            res.render("logFuls.ejs", {Case:"email"});
           } else {

            const name = userLog.username;
            await userLog.save();
            res.render("pageShop.ejs" , {name : name});

           };  
       

       };
    }catch{
        res.render("logFuls.ejs");
        console.log("ereer");
    };
    
});









app.get("/pkg" , (req,res) => {
    res.render("pkg.ejs");
});





app.get("/Admin", (req,res) => {
    res.render("sigAdmin.ejs");
});
app.get("logAdmin" , (req,res)=>{
    res.render("logAdmin.ejs");
});
app.get("sigAdmin" , (req,res)=>{
    res.render("sigAdmin.ejs");
});
app.post("/siginAdmin" , async (req,res) => {
    const {email , password} = req.body ;
    try{
       const result = await admin.find({email :email  , password:password}) ;
       if(result.length == 0 ){
           res.render("sigFulsAdmin.ejs");
       }else{
            const name = result.username;
            res.render("manger.ejs" , {name : name});
       };
    }catch{
        res.render("sigFulsAdmin.ejs");
        console.log("ereer");
    };
});
app.post("/loginAdmin" , async (req,res) => {
    const adminLog = new admin() ;
    adminLog.username = req.body.username;
    adminLog.email = req.body.email;
    adminLog.password = req.body.password;
    try{
       const resultUserName = await admin.find({username :adminLog.username }) ;
       const resultUserEmail = await admin.find({email :adminLog.email }) ;
       
       if(resultUserName.length > 0){
            
            res.render("logFulsAdmin.ejs" ,{Case:"usernsme"} );
            
            
       }else{
           if (resultUserEmail.length > 0) {
            
            res.render("logFulsAdmin.ejs", {Case:"email"});
           } else {

            const name = adminLog.username;
            await adminLog.save();
            res.render("manger.ejs" , {name : name});

           };  
       

       };
    }catch{
        res.render("logFulsAdmin.ejs");
        console.log("ereer");
    };
    
});

app.get("/logOutManger", (req,res) => {
    res.render("sigAdmin.ejs");
});

app.listen("3000" , () => {
    console.log("I am listen of port 3000");
});
