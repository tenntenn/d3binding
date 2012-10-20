d3binding.expandable = function() {
    
    var funcs = [];

    for (arg in arguments) {
        if (typeof arg === "function") {
            funcs.push(arg);
        } 
    }

    // created function
    var that = function() {
        var args = arguments;
        funcs.forEach(function(f) {
            f.apply(that, args);
        });
    };

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
