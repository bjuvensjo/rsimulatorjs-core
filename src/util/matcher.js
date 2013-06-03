module.exports = (function () {
    
    var create = function (value, regExp) {
        var groups = value.match('^' + regExp + '$');

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
