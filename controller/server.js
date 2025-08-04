const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://saburu:28032005@myferstdatabase.luc787a.mongodb.net/?retryWrites=true&w=majority&appName=MyFerstDataBase")
.then(() => {
    console.log("connected successfully");
}).catch((error) => {
    console.log("have error in connect wheth data base" ,error);
});
app.use(express.json());
app.use(express.static('public'));

const user = require("../models/user");

app.use(express.urlencoded({extended:true}));
app.post("/log" , async (req,res) => {
    const userLog = new user() ;
    userLog.usernsme = req.body.usernsme;
    userLog.email = req.body.email;
    userLog.password = req.body.password;
    await userLog.save();
    
});



app.listen("3000" , () => {
    console.log("I am listen of port 3000");
});
