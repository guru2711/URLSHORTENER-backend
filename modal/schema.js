const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    URL:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        unique: true
    },
    clickCount:{
        type: Number
    }
}) 

module.exports = mongoose.model("Url",Schema)