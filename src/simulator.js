var log = require('./util/log');
var simulatorResponse = require('./simulatorResponse');

module.exports = (function () {
    var logger = log.getLogger('rsimulator.core.simulator');
    
     // The simulator encapsulates the simulation logic.
    var create = function (spec) {
        var that = {};

        // Returns a SimulatorResponse that matches the specified request.
        //
        // rootPath the root path on which to search recursively for matches to the specified request
        // rootRelativePath the path on which to search recursively for matches to the specified request
        // request the request
        // contentType the content type of the request, e.g. txt or xml
        that.service = function (options) {
            var theSimulatorResponse;
            var responseBody;

            logger.debug('options: %j', options);

            theSimulatorResponse = spec.handlers[options.contentType].findMatch(options.rootPath, options.rootRelativePath, options.request);

            if (theSimulatorResponse) {
                logger.info('simulatorResponse: %j', simulatorResponse);
            } else {
                responseBody = 'No simulatorResponse found!';
                logger.error('%j, options: %j', responseBody, options);
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
