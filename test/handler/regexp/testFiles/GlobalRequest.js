module.exports = (function () {

    var func = function (simulatorRequest) {
        if (simulatorRequest.request === 'globalRequest') {
            return {
                response: 'globalRequest'
            };
        }
        return undefined;
    };
    
    return func;

}());
