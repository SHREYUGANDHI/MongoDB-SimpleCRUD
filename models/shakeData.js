const mongoose = require("mongoose");

//Shake Schema
const shakeSchema = mongoose.Schema({
    shakeId : String,
    name : String,
    price : String,
    size : String
}, {
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
});

const shakeModel = mongoose.model("shake",shakeSchema,"shake");
module.exports = shakeModel;