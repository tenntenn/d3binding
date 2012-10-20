d3binding.expandable = function() {
    
    // created function
    var that = function() {
        var args = [];
        for (i in arguments) {
            if (arguments.hasOwnProperty(i)) {
                args.push(arguments[i]);
            }
        }
        that.funcs.forEach(function(f) {
            f.apply(that, args);
        });
    };

    that.funcs = [];

    var args = arguments;
    for (i in args) {
        if (typeof args[i] === "function") {
            Object.keys(args[i]).forEach(function(key){
                if (args[i].hasOwnProperty(key)) {
                    that[key] = args[i][key];
                }
            });
            that.funcs.push(args[i]);
        } 
    }

    // expand function
    that.expand = function(newFunc) {
        if (typeof newFunc === "function") {
            that.funcs.push(newFunc);
        }
        return that;
    };

    return that;
};
