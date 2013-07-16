var _ = require('underscore');
var fileUtils = require('../../util/fileUtils');
var log = require('rsimulatorjs-log');
var matcher = require('../../util/matcher');
var properties = require('../../util/properties');
var simulatorResponse = require('../../simulatorResponse');

module.exports = (function () {
    var logger = log.getLogger('rsimulatorjs-core.handler.jsonHandler');

    var format = function (jsonString) {
        if (jsonString) { 
            return JSON.stringify(JSON.parse(jsonString));
        } else {
            return ""; // jsonString is the empty string or some not truthy value
        }
    };

    var formatCandidate = function (jsonString) {
        var candidate;
        if (jsonString) {
            candidate = jsonString.replace(/\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/g, '');
            candidate = candidate.replace(/\n/, '');
            return candidate;
        } else {
            return ""; // jsonString is the empty string or some not truthy value
        }
    };

    var getProperties = function (candidateFile) {
        var propertiesPath = candidateFile.replace(/Request.*$/, '.properties');
        var candidateProperties = properties.getProperties(propertiesPath);
        logger.debug('Properties: ', JSON.stringify(properties));
        return candidateProperties;
    };

    var getResponse = function (candidateFile, matcher) {
        var responseFile = candidateFile.replace(/Request/, 'Response');
        var responseString = fileUtils.read(responseFile);
        var response = formatCandidate(responseString);
        var i;

        for (i = 1; i < matcher.getGroups().length; i++) {
            response = response.replace('${' + i + '}', matcher.getGroups()[i]);
        }

        return response;
    };

    // jsonHandler is a regular expression handler for json (.json).
    var jsonHandler = {

        findMatch: function (rootPath, rootRelativePath, request) {
            var candidate;
            var candidateFile;
            var i = 0;
            var theMatcher;
            var candidateFilesPath = rootPath + rootRelativePath;
            var candidateFiles = fileUtils.findRequests(candidateFilesPath, this.getExtension());
            var theSimulatorResponse;
            var matcherRequest;
            var matcherCandidate;

            logger.debug('candidateFilesPath: ' + candidateFilesPath);
            
            while (i < candidateFiles.length) {
                candidateFile = candidateFiles[i];

                candidate = fileUtils.read(candidateFile);
                matcherCandidate = formatCandidate(candidate);
                matcherRequest = format(request);
                theMatcher = matcher.create(matcherRequest, matcherCandidate);
                if (theMatcher.matches()) {
                    theSimulatorResponse = simulatorResponse.create(getResponse(candidateFile, theMatcher), 
                                                                 getProperties(candidateFile),
                                                                 candidateFile
                                                                );
                    logger.debug('simulatorResponse:  %j', theSimulatorResponse);
                    return theSimulatorResponse;
                }

                i += 1;
            }

            return null;
        },

        getExtension: function () {
            return 'json';
        }

    };

    return jsonHandler;
    
}());
