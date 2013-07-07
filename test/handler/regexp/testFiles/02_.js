module.exports = (function () {

    var func = function (simulatorRequest, simulatorResponse) {
        if (simulatorRequest.request === 'localResponse') {
            simulatorResponse.response = 'localResponse';
        }
    };
    
    return func;

}());
