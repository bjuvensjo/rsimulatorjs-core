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

    'findMatch object': function () {
        var requestJSON = {
            'foo': 'foo',
            'bar': true
        };

        var expected = {
            "foo": "foo",
            "bar": "bar"
        };


        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch('test', '/handler/regexp/testFiles', request);
        assert.equals(response.response, JSON.stringify(expected));
    },

    'empty query string': function () {
        var requestJSON = '';

        var expected = {
            "foo": "foo",
            "bar": "bar"
        };

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch('test', '/handler/regexp/testFiles', request);
        assert.equals(response.response, JSON.stringify(expected));
    },

    'query string': function () {
        var requestJSON = 'a=b&c=d';

        var expected = "true";

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch('test', '/handler/regexp/testFiles', request);
        assert.equals(response.response, JSON.stringify(expected));
    },

    'wildcard request': function () {
        var requestJSON = {
            'wildcard': true
        };

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch('test', '/handler/regexp/testFiles', request);
        assert.equals(response.response, request);
    },

    'complex wildcard request': function () {
        var requestJSON = {
            "household": {
                "children": 1,
                "alimonyBenefit": 102.83333333333333,
                "alimony": 1000
            },
            "contactPerson": "Tomas Andersson",
            "notes": {"value" : 1000}
        };

        var expected = {
            "value" : 1000,
            "object" : {"value" : 1000}
        };

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch('test', '/handler/regexp/testFiles', request);
        console.dir(response);
        assert.equals(response.response, JSON.stringify(expected));
    }
});
