d3binding.expandable = function(fnc) {
    
    var funcs;

    if (typeof fnc !== "function") {
        fnc = function() {};
    }

    funcs = [fnc];

    // created function
    var that = function() {
        funcs.forEach(function(f) {
            f.apply(this, arguments);
        });
    };

    // expand function
    that.expand = function(newFunc) {
        if (typeof newFunc === "function") {
            funcs.push(newFunc);
        }
        return that;
    };

    return that;
};
