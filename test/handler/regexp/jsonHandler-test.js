var buster = require('buster');
var jsonHandler = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));

buster.testCase('jsonHandler', {

    'getExtension': function () {
        var actual = jsonHandler.getExtension();
        var expected = 'json';
            
        assert.equals(actual, expected);
    }

});

buster.testCase('jsonHandler', {

    'findMatch': function () {
        var requestJSON = {
            'foo': 'foo',
            'bar': 'bar'
        };

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch('test', '/handler', request);

        assert(response, 'jsonHandlerTest');
        assert(response.response, 'jsonHandlerTest');
        assert(response.properties, 'jsonHandlerTest');
        assert(response.matchingRequestFile, 'jsonHandlerTest');
    },

    'findMatch': function () {
        var request = '';

        var response = jsonHandler.findMatch('test/handler', '/regexp', request);

        assert(response, 'jsonHandlerTest');
        assert(response.response, 'jsonHandlerTest');
        assert(response.matchingRequestFile, 'jsonHandlerTest');
    }

});
