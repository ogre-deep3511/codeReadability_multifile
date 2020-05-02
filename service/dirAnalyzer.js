const fs = require('fs');
global.q = require('q');
const exec = require('child_process').exec;
// global.util = require('./util/util.js')();

module.exports = function () {
    var obj = {
        unzippingProject: function() {
            var fileLocation = "./uploads/" + global.file.name;
            global.utility.unzipFile(fileLocation);
        },

        copyProjectContent: function() {
            var fileLoc = "./unzipFile/" + global.splitFilename[0];
            global.utility.copyContent(fileLoc);
        },

        //Reading files from input directory, processing the files 
        //and generating report in destination Directory.
        generateReport: function(directory, repository) {
            var deferred = global.q.defer();

            fs.readdir(directory, (err, files) => {
                files.forEach(file => {
                    var fileName = file;
                    // if(fileName.search(".") == 0 || fileName.search(".c") > 0 || fileName.search(".cpp") > 0 || fileName.search(".java") > 0 || fileName.search(".py") > 0 || fileName.search(".js") > 0 ) {
                        var filePath = directory + "/" + fileName;
                        var splitFilename = file.split(".");
                        var language = (splitFilename[1]);

                        if(language === undefined) {
                            global.analyze.generateReport(filePath, repository);
                        }
                        else {
                            var dir = repository;

                            if(splitFilename[1] !== "readability") {
                                var cmd = getCommand(filePath, fileName, language, dir);
                                
                                exec(cmd, (err, data) => {
                                    var obj = {};
                                    if(!err) {
                                        obj = {
                                            error: false,
                                            input: data
                                        };
                                        deferred.resolve(obj);
                                    }
                                    else {
                                        obj = {
                                            error: false,
                                            input: data
                                        };
                                        deferred.resolve(obj);
                                    }
                                });
                            }
                        }
                    //  }
                    // else {
                    //     return;
                    // }
                    
                    
                });
            });
            return deferred.promise;
        },

        //Parsing the generated Report and creating a parsed report/
        parseReport: function(repository, resultList, req) {
            var deferred = global.q.defer();
            var directory = repository;
            fs.readdir(directory, (err, files) => {
                   
                files.forEach(file => {
                    var splitFilename = file.split(".");
                    var splitLang = splitFilename[1].split("*");
                    var langUAGE = splitLang[0];
                    var lang;
                    var tool;

                    switch(langUAGE) {
                        case 'c':
                            lang = "c";
                            tool = "oclint";
                            break;
                        case 'cpp':
                            lang = "cpp";
                            tool = "oclint";
                            break;
                        case 'c++':
                            lang = "cpp";
                            tool = "oclint";
                            break;
                        case 'java':
                            lang = "java";
                            tool = "checkstyle";
                            break;
                        case 'py':
                            lang = "python";
                            tool = "pylint";
                            break;
                        case 'js':
                            lang = "javascript";
                            tool = "ESLint";
                            break;
                        case 'html':
                            lang = "html";
                            tool = "HtmlHint";
                            break;
                        case 'css':
                            lang = "css";
                            tool = "StyleLint";
                            break;
                        default:

                    }

                    if(splitLang[1] === "readability") {
                        var parsed_output = [];
                        // var myJSON = [];
                        var objJSON = {};
                        var completeFilePath = directory + "/" + file;
                        fs.readFile(completeFilePath, 'utf8', (err, data) => {
                            var parseObj = {};
                            if(err) {
                                    parseObj = {
                                    error: true,
                                    input: err
                                };
                            }
                            else {
                                parseObj = {
                                    error: false,
                                    input: data
                                };
                            }

                            if(parseObj.error == false) {
                                var unused_variable = 0;
                                var unused_parameter = 0;
                                var line_length = 0;
                                var method_length = 0;
                                var parameter_number = 0;
                                var empty_block = 0;
                                var indentation = 0;
                                var quote = 0;
                                var semicolon = 0;
                                var doctype = 0;
                    
                                var unused_variable_details = [];
                                var unused_parameter_details = [];
                                var line_length_details = [];
                                var method_length_details = [];
                                var parameter_number_details = [];
                                var empty_block_details = [];
                                var indentation_details = [];
                                var quote_details = [];
                                var semicolon_details = [];
                                var doctype_details = [];
                                
                                //Analyzing the report and generating metrics for calculating readability score.
                                parsed_output = parseObj.input.split("\n");
                                for(i=0; i<parsed_output.length; i++) {
                                    if(parsed_output[i].includes("unused local variable") || parsed_output[i].includes("(unused-variable)") || parsed_output[i].includes("is assigned a value but never used" || parsed_output[i].includes("unused parameter")) || parsed_output[i].includes("no-unused-vars")) {
                                        unused_variable += 1;
                                        unused_variable_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("unused method parameter") || parsed_output[i].includes("(unused-argument)")) {
                                        unused_parameter += 1;
                                        unused_parameter_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("long line") || parsed_output[i].includes("[LineLength]") || parsed_output.includes("(line-too-long)") || parsed_output.includes("(max-line-length)") || parsed_output.includes("max-len")) {
                                        line_length += 1;
                                        line_length_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("long method") || parsed_output[i].includes("[MethodLength]") || parsed_output[i].includes("(too-many-statements)") || parsed_output[i].includes("max-lines-per-function")) {
                                        method_length += 1;
                                        method_length_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("too many parameters") || parsed_output[i].includes("[ParameterNumber]") || parsed_output[i].includes("(too-many-arguments)") || parsed_output[i].includes("max-params")) {
                                        parameter_number += 1;
                                        parameter_number_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("empty") || parsed_output[i].includes("[EmptyBlock]") || parsed_output[i].includes("no-empty")) {
                                        empty_block += 1;
                                        empty_block_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("Expected indentation of 4 spaces but found") || parsed_output[i].includes("Expected indentation")) {
                                        indentation += 1;
                                        indentation_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("Strings must use singlequote") || parsed_output[i].includes("selector-attribute-quotes") || parsed_output[i].includes("attr-value-double-quotes")) {
                                        quote += 1;
                                        quote_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("Missing semicolon") || parsed_output[i].includes("Expected a trailing semicolon")) {
                                        semicolon += 1;
                                        semicolon_details.push(parsed_output[i]);
                                    }
                                    else if(parsed_output[i].includes("Doctype must be declared first.")) {
                                        doctype += 1;
                                        doctype_details.push(parsed_output[i]);
                                    }
                                }
        
                                //Creating report in JSON.
                                myJSON = [
                                    {
                                        "type": "Doctype",
                                        "rating": "5",
                                        "metric": doctype,
                                        "details": doctype_details
                                    },
                                    {
                                        "type": "Singlequote",
                                        "rating": "5",
                                        "metric": quote,
                                        "details": quote_details
                                    },
                                    {
                                        "type": "Semicolon",
                                        "rating": "5",
                                        "metric": semicolon,
                                        "details": semicolon_details
                                    },
                                    {
                                        "type": "Indentation",
                                        "rating": "5",
                                        "metric": indentation,
                                        "details": indentation_details
                                    },
                                    {
                                        "type": "unused variable",
                                        "rating": "5",
                                        "metric": unused_variable,
                                        "details": unused_variable_details
                                    },
                                    {
                                        "type": "unused parameter",
                                        "rating": "5",
                                        "metric": unused_parameter,
                                        "details": unused_parameter_details
                                    },
                                    {
                                        "type": "line length",
                                        "rating": "5",
                                        "metric": line_length,
                                        "details": line_length_details
                                    },
                                    {
                                        "type": "method length",
                                        "rating": "5",
                                        "metric": method_length,
                                        "details": method_length_details
                                    },
                                    {
                                        "type": "parameter number",
                                        "rating": "5",
                                        "metric": parameter_number,
                                        "details": parameter_number_details
                                    },
                                    {
                                        "type": "empty block",
                                        "rating": "5",
                                        "metric": empty_block,
                                        "details": empty_block_details
                                    }
                                ];

                                console.log(req.body.Confirmation);
                                if(req.body.Confirmation == 'yes') {
                                    for(index = 0; index < myJSON.length; index++) {
                                        switch(index) {
                                            case 0:
                                                myJSON[index].rating = req.body.Doctype_weightage;
                                                break;
                                            case 1:
                                                myJSON[index].rating = req.body.Quote_weightage;
                                                break;
                                            case 2:
                                                myJSON[index].rating = req.body.Semicolon_weightage;
                                                break;
                                            case 3:
                                                myJSON[index].rating = req.body.Indentation_weightage;
                                                break;
                                            case 4:
                                                myJSON[index].rating = req.body.UnusedVariable_weightage;
                                                break;
                                            case 5:
                                                myJSON[index].rating = req.body.UnusedParameter_weightage;
                                                break;
                                            case 6:
                                                myJSON[index].rating = req.body.LineLength_weightage;
                                                break;
                                            case 7:
                                                myJSON[index].rating = req.body.MethodLength_weightage;
                                                break;
                                            case 8:
                                                myJSON[index].rating = req.body.ParameterNumber_weightage;
                                                break;
                                            case 9:
                                                myJSON[index].rating = req.body.EmptyBlock_weightage;
                                                break;
                                            default:

                                        }
                                    }
                                 }
        
                                //Creating final Report.
                                objJSON = {
                                    "filename": file,
                                    "language": lang,
                                    "tool": tool,
                                    "output": global.myJSON
                                };

                                resultList.push(objJSON);
                                // console.log(resultList);
                                console.log(objJSON);                    
                            }
   
                        });
                        deferred.resolve(resultList);

                    }
                    else {
                        deferred.reject(resultList);
                    }
                    
                });
            });
            return deferred.promise;
        },

        scoreReport: function(resultList) {
            var deferred = global.q.defer();

            if(resultList) {
                // console.log("score function started");
                var count = 0;
                var TotalScoreSum = 0;
                // console.log(count);
                // console.log(TotalScoreSum);
                // console.log(resultList);
                for(index = 0; index < resultList.length; index++) {
                    // console.log("outer loop started");
                    count++;
                    // console.log(count);
                    var marks1 = 0;
                    var total1 = 0;
                    var marks2 = 0;
                    var total2 = 0;
                    for(i=0; i<resultList[index].output.length; i++) {
                        // console.log("inner loop started");
                        if(resultList[index].output[i].metric > 0) {
                            
                            total1 = total1 + (resultList[index].output[i].metric)*(resultList[index].output[i].rating);
                            marks1 = marks1 + (resultList[index].output[i].metric)*(resultList[index].output[i].rating);
                            total2 = total2 + resultList[index].output[i].rating*1;
                            marks2 = marks2 + resultList[index].output[i].rating*1;
                        }
                        else {
                            total1 = total1 + resultList[index].output[i].rating*1;
                            total2 = total2 + resultList[index].output[i].rating*1;
                        }
                    }
                    // console.log("Final calculation started");
                    
                    ReadabilityScore1 = (100 - (marks1/total1)*100);
                    ReadabilityScore2 = (100 - (marks2/total2)*100);
                    FinalReadabilityScore = (ReadabilityScore1 + ReadabilityScore2) / 2;
                    console.log("Score of File " + count);
                    console.log(FinalReadabilityScore + "%");
                    TotalScoreSum += FinalReadabilityScore;
                }

                var AggregateScore = parseFloat(TotalScoreSum / count);
                console.log("Aggregate Score of your project:");
                console.log(AggregateScore + "%");
                // var FinalScoreToBeSent = AggregateScore + "%";

                let temp_result = "Aggregate Score of your project: ";
                temp_result += AggregateScore;
                temp_result += "%";

                resultList.push(temp_result);
                

                // deferred.resolve(FinalScoreToBeSent);
            }
            else {
                deferred.reject(FinalScoreToBeSent);
            }

            return deferred.promise;
        },

        printReport: function(resultList, res) {
            res.status(200).send(resultList);
        },

        deleteReport: function() {
            global.utility.flushReport();
        }
    };
    return obj;

};


function getCommand(filePath, fileName, language, dir) {
    var command = "";
    var append = language + "*" + "readability";
    var choppedFileName = fileName.split(".");
    switch (language) {
        case 'c':
            command = "oclint -o " + dir + "/" + choppedFileName[0] + "." + append + " " + filePath + " -- -c";
            break;
        case 'cpp':
            command = "oclint -o " + dir + "/" + choppedFileName[0] + "." + append + " " + filePath + " -- -c";
            break;
        case 'c++':
            command = "oclint -o " + dir + "/" + choppedFileName[0] + "." + append + " " + filePath + " -- -c";
            break;
        case 'java':
            command = "java -jar checkstyle-8.29-all.jar -c /sun_checks.xml ./" + filePath + " > ./" + dir + "/" + choppedFileName[0] + "." + append;
            break;
        case 'py' :
            command = "pylint " + filePath + " > " + dir + "/" + choppedFileName[0] + "." + append;
            break;
        case 'js':
            command = "npm run lint " + filePath + " > " + dir + "/" + choppedFileName[0] + "." + append;
            break;
        case 'html':
            command = "./node_modules/.bin/htmlhint " + filePath + " > " + dir + "/" + choppedFileName[0] + "." + append;
            break;
        case 'css':
            command = "npx stylelint " + filePath + " > " + dir + "/" + choppedFileName[0] + "." + append;
            break;
        default: 
            command = " ";
            console.log("File not supported");
    }
    return command;
};

