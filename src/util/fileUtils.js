var _ = require('underscore');
var fs = require('fs');
var log = require('rsimulatorjs-log');
var util = require('util');

module.exports = (function () {
    var logger = log.getLogger('rsimulatorjs-core.util.fileUtils');

    return {

        // Returns the requests that have the specified file extension and are in the 
        // specified directory or a subdirectory.
        findRequests: function(directoryPath, fileExtension) {
            var requests = [];

            var find = function (fileName, accepts, files) {
                var fileNames;
                var i;
                var stat;
                if (fs.existsSync(fileName)) {
                    stat = fs.statSync(fileName);
                    if (stat.isDirectory()) {
                        fileNames = fs.readdirSync(fileName);
                        _.each(fileNames, function(name) {
                            find(fileName + '/' + name, accepts, files);
                        });
                    } else if (accepts(fileName)) {
                        logger.debug("adds %s", fileName);
                        files.push(fileName);
                    };
                };
            };

            var pattern = new RegExp('Request.' + fileExtension + '$');
            find(directoryPath, function (fileName) {
                return pattern.test(fileName);
            }, requests);

            logger.debug("Requests: %j", requests);

            return requests;
        },

        // Returns the content of the specified file as string.
        read: function(filePath) {
            return fs.readFileSync(filePath, {
                encoding: 'UTF-8'
            });
        }   
     
    };          

}());
