var buster = require('buster');
var module = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));

buster.testCase('module', {

    'should be a simulator object': function () {

        var actual = module.service;
        assert(actual);
    
    }

});
