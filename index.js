const express = require("express");
const bodyParser = require("body-parser");
const RouteManager = require("./routes/route");
const db  = require("./models/dbConnection");
const app = express();

    app.use(bodyParser.json());
    RouteManager.getAppRoutes().forEach(route => {
        app[route.method](route.path, route.action);
    });

    db.once("connected",()=>{
        console.log("DB connection open");
        app.listen(3000, (req, res) => {

            console.log("Server started");
        })
    })

    module.exports = app;
