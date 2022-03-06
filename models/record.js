const mongoose = require("mongoose");
const dbconnection = require("./dbConnection");

const recordsSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
    },
    count:{
        type:[Number]
    }
}
);

exports.recordModel = dbconnection.model("record",recordsSchema);