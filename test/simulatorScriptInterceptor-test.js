var buster = require('buster');
var simulatorScriptInterceptor = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));

buster.testCase('simulatorScriptInterceptor', {

    'noScript': function () {
        var theSimulator = {
            service: function (simulatorRequest) {
                return {
                    response: 'noScript'
                };
            }
        };

        simulatorScriptInterceptor.intercept(theSimulator);

        var simulatorRequest = {
            rootPath: 'dummy',
            rootRelativePath: '',
            request: 'noScript',
            contentType: 'json'
        };


        var actual = theSimulator.service(simulatorRequest);
        assert.equals(actual.response, 'noScript');
    },

    'globalRequest': function () {
        var theSimulator = {
            service: function (simulatorRequest) {
            }
        };

        simulatorScriptInterceptor.intercept(theSimulator);

        var simulatorRequest = {
            rootPath: 'test/handler/regexp/testFiles',
            rootRelativePath: '',
            request: 'globalRequest',
            contentType: 'json'
        };


        var actual = theSimulator.service(simulatorRequest);
        assert.equals(actual.response, 'globalRequest');
    },

    'localResponse': function () {
        var theSimulator = {
            service: function (simulatorRequest) {
                return {
                    response: 'json',
                    matchingRequestFile: 'test/handler/regexp/testFiles/02_Request.json'
                };
            }
        };

        simulatorScriptInterceptor.intercept(theSimulator);

        var simulatorRequest = {
            rootPath: 'test/handler/regexp/testFiles',
            rootRelativePath: '',
            request: 'localResponse',
            contentType: 'json'
        };


        var actual = theSimulator.service(simulatorRequest);
        assert.equals(actual.response, 'localResponse');
    },

    'globalResponse': function () {
        var theSimulator = {
            service: function (simulatorRequest) {
                return {
                    response: 'json'
                };
            }
        };

        simulatorScriptInterceptor.intercept(theSimulator);

        var simulatorRequest = {
            rootPath: 'test/handler/regexp/testFiles',
            rootRelativePath: '',
            request: 'globalResponse',
            contentType: 'json'
        };

        var actual = theSimulator.service(simulatorRequest);
        assert.equals(actual.response, 'globalResponse');
    }

});
