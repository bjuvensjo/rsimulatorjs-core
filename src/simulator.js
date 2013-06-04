var jsonHandler = require('./handler/regexp/jsonHandler');
var log = require('rsimulatorjs-log');
var simulatorResponse = require('./simulatorResponse');

module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-core.simulator');

    var defaultOptions = {
        handlers: {
            json: jsonHandler
        }
    };
    
     // The simulator encapsulates the simulation logic.
    var create = function (options) {
        var that = {};
        var theOptions = options || defaultOptions;

        // Returns a SimulatorResponse that matches the specified request.
        //
        // rootPath the root path on which to search recursively for matches to the specified request
        // rootRelativePath the path on which to search recursively for matches to the specified request
        // request the request
        // contentType the content type of the request, e.g. txt or xml
        that.service = function (simulatorRequest) {
            var handler;
            var responseBody;
            var theSimulatorResponse;

            logger.debug('simulatorRequest: %j', simulatorRequest);

            handler = theOptions.handlers[simulatorRequest.contentType];

            theSimulatorResponse = handler.findMatch(simulatorRequest.rootPath, simulatorRequest.rootRelativePath, simulatorRequest.request);

            if (theSimulatorResponse) {
                logger.info('simulatorResponse: %j', simulatorResponse);
            } else {
                responseBody = 'No simulatorResponse found!';
                logger.error('%j, simulatorRequest: %j', responseBody, simulatorRequest);
                theSimulatorResponse = simulatorResponse.create(responseBody);
            };

            return theSimulatorResponse;
        };

        return that;
    };
    
    return {
        create: create
    };

}());
