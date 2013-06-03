var _ = require('underscore');
var fileUtils = require('./fileUtils');
var fs = require('fs');

// properties is a utility that reloads properties from disk when changed.
module.exports = {

    // Returns the properties read from the specified file.
    getProperties: function (filePath) {
        var fileContent;
        var entry;
        var lines;
        var properties = {};
        
        if (!fs.existsSync(filePath)) {
            return properties;
        }

        fileContent = fileUtils.read(filePath);

        // Parse the file content 
        lines = fileContent.split('\n');
        _.each(lines, function (line) {
            if (!/^#/.test(line) && /=/.test(line)) {
                entry = line.split('=');
                properties[entry[0].trim()] = entry[1].trim();
            };
        });

        return properties;
    }

};
