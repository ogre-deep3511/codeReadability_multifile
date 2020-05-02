var express = require('express');
global.app = express();
var fileupload = require('express-fileupload');
global.app.use(fileupload());

global.app.use((req, res, next) => {
    global.file = req.files.file;
    global.splitFilename = global.file.name.split(".");
    // console.log(global.file);
    global.file.mv("./uploads/" + global.file.name, (err, result) => {
        if(err) {
            throw err;
        } 
        else {
            console.log("File uploaded successfully!!!");
        }
        // res.send({
        //     success: true,
        //     message: "File uploaded"
        // });
    });

    next();
});

function loadApi() {
    
    //require('./api/readability.js')();
    require('./api/projectReadability.js')();
    console.log("Api Loaded");
}

function loadServices() {
    
    global.analyze = require('./service/dirAnalyzer.js')();
    global.utility = require('./utility/utility.js')();
}

app.listen(3000, () => {
    loadApi();
    loadServices();
    // console.log(global.utility);
    console.log("Server started on port: 3000");
});