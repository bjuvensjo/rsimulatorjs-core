var simulator = require('./simulator');
var simulatorScriptInterceptor = require('./simulatorScriptInterceptor');

module.exports = (function () {
    
    var theSimulator = simulator.create();

    simulatorScriptInterceptor.intercept(theSimulator);

    return theSimulator;

}());
