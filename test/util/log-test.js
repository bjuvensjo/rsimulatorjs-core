var buster = require('buster');
var logger = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));


buster.testCase('getLogger', {
    
    'getLogger': function () {
        assert(logger.getLogger());
    }
    
});

buster.testCase('getLogger', {
    
    'getLogger.info': function () {

        assert(logger.getLogger().info);

    }

});

