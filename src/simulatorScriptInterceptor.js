var _ = require('underscore');
var fs = require('fs');
var log = require('rsimulatorjs-log');
var path = require('path');

module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-core.simulatorScriptInterceptor');

    var getScriptFunction = function (scriptFile) {
        var scriptFilePath = path.resolve(scriptFile);
        var scriptFunction;
        
        logger.debug('scriptFilePath: %s', scriptFilePath);

        if (fs.existsSync(scriptFilePath)) {
            scriptFunction = require(scriptFilePath);
        }

        logger.debug('scriptFunction: %s', scriptFunction);

        return scriptFunction;
    };

    var applyGlobalRequestScript = function (simulatorRequest) {
        var scriptFile;
        var scriptFunction;

        logger.debug('applyGlobalRequestScript');

        scriptFile = simulatorRequest.rootPath + '/GlobalRequest.js';
        scriptFunction = getScriptFunction(scriptFile);
        if (scriptFunction) {
            return scriptFunction.call(this, simulatorRequest);
        }
        
        return undefined;
    };

    var applyGlobalResponseScript = function (simulatorRequest, simulatorResponse) {
        var scriptFile;
        var scriptFunction;

        logger.debug('applyGlobalResponseScript');

        scriptFile = simulatorRequest.rootPath + '/GlobalResponse.js';
        scriptFunction = getScriptFunction(scriptFile);
        if (scriptFunction) {
            scriptFunction.call(this, simulatorRequest, simulatorResponse);
        }
    };

    var applyLocalResponseScript = function (simulatorRequest, simulatorResponse) {
        var scriptFile;
        var scriptFunction;

        logger.debug('applyLocalResponseScript');

        if (simulatorResponse.matchingRequestFile) {
            scriptFile = simulatorResponse.matchingRequestFile.replace(/Request.*$/, '.js');
            scriptFunction = getScriptFunction(scriptFile);
            if (scriptFunction) {
                scriptFunction.call(this, simulatorRequest, simulatorResponse);
            }
        }
    };

    var simulatorScriptInterceptor = function (func, simulatorRequest) {
        var scriptFunction;
        var simulatorResponse;

        logger.debug('simulatorRequest: %j', simulatorRequest);

        simulatorResponse = applyGlobalRequestScript(simulatorRequest);

        // If applyGlobalRequestScript returns a simulatorResponse return, i.e. do not continue invocation
        if (simulatorResponse) {
            return simulatorResponse;
        }

        simulatorResponse = func.call(this, simulatorRequest);

        applyLocalResponseScript(simulatorRequest, simulatorResponse);
        
        applyGlobalResponseScript(simulatorRequest, simulatorResponse);

        return simulatorResponse;
    };

    var intercept = function (simulator) {
        simulator.service = _.wrap(simulator.service, simulatorScriptInterceptor);
    };
    
    return {
        intercept: intercept
    };

}());
