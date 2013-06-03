module.exports = (function () {
    
    var create = function (response, properties, matchingRequestFile) {
        return {
            response: response,
            properties: properties,
            matchingRequestFile: matchingRequestFile
        };
    };

    return {
        create: create
    };

}());
