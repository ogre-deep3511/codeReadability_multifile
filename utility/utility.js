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
        },

        flushReport: function() {
            var cmd = "./delete_script.sh";
            exec(cmd, (err) => {
                if(err) {
                    throw err;
                }
                else {
                    console.log("Files deleted successfully");
                }
            });
        }
    };
    return obj;
}