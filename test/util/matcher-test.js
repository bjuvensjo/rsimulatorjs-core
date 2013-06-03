var buster = require('buster');
var matcher = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));


buster.testCase('getGroups', {

    'getGroups': function () {
        var request = 'request';
        var candidate = '(r)[a-z]+(t)';
        
        var theMatcher = matcher.create(request, candidate);

        assert.equals(theMatcher.getGroups().length, 3);
    }

});

buster.testCase('matches, should match', {

    'matches': function () {
        var request = 'request';
        var candidate = 'r[a-z]+t';
        
        var theMatcher = matcher.create(request, candidate);

        assert(theMatcher.matches());
    }

});

buster.testCase('matches, should not match', {

    'matches': function () {
        var request = 'request';
        var candidate = 'Xr[a-z]+t';
        
        var theMatcher = matcher.create(request, candidate);

        refute(theMatcher.matches());
    }

});
