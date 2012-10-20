d3binding.expandable = function() {
    
    var funcs = [];

    // created function
    var that = function() {
        var args = arguments;
        funcs.forEach(function(f) {
            f.apply(that, args);
        });
    };


    var args = arguments;
    for (i in args) {
        if (typeof args[i] === "function") {
            Object.keys(args[i]).forEach(function(key){
                if (args[i].hasOwnProperty(key)) {
                    that[key] = args[i][key];
                }
            });
            funcs.push(args[i]);
        } 
    }

    // expand function
    that.expand = function(newFunc) {
        if (typeof newFunc === "function") {
            newThat = d3binding.expandable.apply(this, funcs.concat(newFunc));
            Object.keys(that).forEach(function(key){
                if (that.hasOwnProperty(key)) {
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
