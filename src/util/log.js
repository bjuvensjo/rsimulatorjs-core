var log4js = require('log4js');
var util = require('util');

module.exports = (function () {

    var loggers = {};

    var doLog = function (log4jLogger, level, logArguments) {
        var args = Array.prototype.slice.call(logArguments);
        var logEntry = util.format.apply(this, args);
        log4jLogger[level](logEntry);
    };

    var getLogger = function (name) {
        var logger = loggers[name];

        if (!logger) {
            logger = (function (log4jLogger) {
                
                return {
                    debug: function () {
                        doLog(log4jLogger, 'debug', arguments);
                    },
                    info: function () {
                        doLog(log4jLogger, 'info', arguments);
                    },
                    error: function () {
                        doLog(log4jLogger, 'error', arguments);
                    }
                };
                
            }(log4js.getLogger(name)));

            loggers[name] = logger;
        }

        return logger;
        
    };

    return {
        getLogger: getLogger
    };

}());
