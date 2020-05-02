module.exports = function() {
    // global.analyze = require('./dirAnalyzer.js')();

    global.app.post("/api/projectReadability", (req, res) => {
        var directory = "./DirToBeAnalyzed";
        var repository = "./LintOutputRepository";
        var resultList = [];

        // if(global.analyze.unzippingProject())
        // {
        //     res.send("Successfully unzipped project directory");
        // }
        setTimeout(global.analyze.unzippingProject, 2500);

        setTimeout(global.analyze.copyProjectContent, 5000);
        
        setTimeout(global.analyze.generateReport, 10000, directory, repository);
        
        setTimeout(global.analyze.parseReport, 20000, repository, resultList, req);
        
        setTimeout(global.analyze.scoreReport, 22000, resultList);

        setTimeout(global.analyze.printReport, 24000, resultList, res);
        
        setTimeout(global.analyze.deleteReport, 25000);
    });

    

    // global.analyze.generateReport(directory, repository).then((result) => {
    //     global.analyze.parseReport(repository, resultList).then((result) => {
    //         global.analyze.scoreReport(result).then((result) => {
    //             console.log(result);
    //         }, (err) => {
    //             console.log(err);
    //         })
    //     }, (err) => {
    //         console.log(err);
    //     })
    // }, (err) => {
    //     console.log(err);
    // });

}