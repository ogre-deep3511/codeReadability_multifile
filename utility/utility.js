// global.q = require('q');
const exec = require('child_process').exec;
var fs = require('fs');

module.exports = function () {

    var obj = {

        unzipFile: function (fileLocation) {

            cmd = "unzip " + fileLocation + " -d " + "./unzipFile";

            exec(cmd, (err) => {
                if(!err) {
                    console.log("File extracted successfully.");
                }
                else {
                    throw err;
                    // console.log("File extraction failed.);
                }
            });

        },

        copyContent: function(Dir) {

            var cmd = "cp -r " + Dir + "/*" + " ./DirToBeAnalyzed";

            exec(cmd, (err) => {
                if(err) {
                    throw err;
                }
                else {
                    console.log("File copied successfully");
                }
            });

            // fs.readdir(Dir, (err, files) => {
            //     files.forEach(file => {
            //         cmd = "cp " + Dir + "/" + file + " ./DirToBeAnalyzed";

            //         exec(cmd, (err) => {
            //             if(err) {
            //                 throw err;
            //             }
            //             else {
            //                 console.log("File copied successfully");
            //             }
            //         });
            //     });
            // });
        }
    };
    return obj;
}