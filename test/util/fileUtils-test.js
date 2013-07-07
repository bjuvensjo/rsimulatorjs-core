var buster = require('buster');
var fileUtils = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));

buster.testCase('file-utils', {

    'findRequests': function () {
        var fileNames = fileUtils.findRequests(__dirname, 'json');
        var actual = fileNames.length;
        var expected = 2;

        assert.equals(actual, expected);
    }

});

buster.testCase('file-utils', {

    'read': function () {
        var actual = fileUtils.read(__filename);
        
        assert(actual.match(/123456/));
    }

});

