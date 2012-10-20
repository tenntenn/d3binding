d3binding.expandable = function() {
    
    var funcs = [];

    // created function
    var that = function() {
        var args = arguments;
        funcs.forEach(function(f) {
            f.apply(that, args);
        });
    };


    for (arg in arguments) {
        if (typeof arg === "function") {
            Object.keys(arg).forEach(function(key){
                if (arg.hasownproperty(key)) {
                    that[key] = arg[key];
                }
            });
            funcs.push(arg);
        } 
    }

    // expand function
    that.expand = function(newFunc) {
        if (typeof newFunc === "function") {
            newThat = d3binding.expandable.apply(this, funcs.concat(newFunc));
            Object.keys(that).forEach(function(key){
                if (that.hasownproperty(key)) {
                    newThat[key] = that[key];
                }
            });
            return newThat; 
        } else {
            return that;
        }
    };

    return that;
};
