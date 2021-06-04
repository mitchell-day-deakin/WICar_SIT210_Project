const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const port = 80;


const WebServer = (startupCallback, evtCallback) => {
    app.use(express.static(`${__dirname}/assets`));

    app.get('/', (req, res, next) => {
        console.log("Access home page")
        res.sendFile(path.join(__dirname, `/assets/index.html`));
    })
    //this will handle the controller events from client GUI
    app.get('/event', (req, res, next) => {
        //console.log(req.query);
        let task = req.query.task; //this is the button pressed
        let event = req.query.event; //this has button state down or up
        evtCallback(req.query)
        res.json({ error: false, msg: task });
    })

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        startupCallback("started");
    })
}

module.exports = WebServer
