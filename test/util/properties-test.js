var buster = require('buster');
var properties = require(__filename
                         .replace(/test/, 'src')
                         .replace(/-test.js$/, '.js'));

buster.testCase('Non existing properties', {

    'getProperties': function () {
        var theProperties = properties.getProperties('NonExisting.properties');

        assert.equals(theProperties, {});
    }

});

buster.testCase('Existing properties', {

    'getProperties': function () {
        var theProperties = properties.getProperties(__dirname + '/testFiles/01_.properties');

        assert(theProperties);
    }

});

buster.testCase('Expected values', {

    'getProperties': function () {
        var theProperties = properties.getProperties(__dirname + '/testFiles/01_.properties');

        assert.equals(theProperties.foo, 'foo');
    }

});
