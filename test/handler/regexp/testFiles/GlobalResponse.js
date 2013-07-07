module.exports = (function () {

    var func = function (simulatorRequest, simulatorResponse) {
        if (simulatorRequest.request === 'globalResponse') {
            simulatorResponse.response = 'globalResponse';
        };
        return undefined;
    };
    
    return func;

}());
