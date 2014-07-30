module.exports = (function () {
    
    var create = function (value, regExp) {
        var regex = new RegExp('^' + regExp + '$');
        var groups = value.match(regex);

        return {
            getGroups: function () {
                return groups;
            },
            matches: function () {
                return !!groups;
            }
        };        
    };

    return {
        create: create
    };

}());
