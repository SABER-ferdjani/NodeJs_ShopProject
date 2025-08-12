const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const produeSchema = new Schema({
    name :String ,
    number : Number ,
    prix : Number ,
    picter : File ,
    
});

const produe = mongoose.model("produe" , produeSchema);

module.exports = produe ;