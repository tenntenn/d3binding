d3binding.expandable = function(fnc) {

    if (typeof fnc !== "function") {
        fnc = function() {};
    }

    // created function
    var that = function() {
        fnc.apply(that, arguments);
    };

    // expand function
    that.expand = function(newFunc) {
        var f = fnc;
        fnc = function() {
            f.apply(that, arguments);
            newFunc.apply(that, arguments);
        };

        return that;
    };

    return that;
};
