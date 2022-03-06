const mongoose = require("mongoose");
const config = require("../config/index");

const db = mongoose.createConnection(config.db.host);
db.on("error",()=>{
    console.log("Error while connecting database");
})

module.exports = db;