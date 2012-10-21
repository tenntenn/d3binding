(function() {
d3binding.binding = function() {

    var that = d3binding.expandable();
    that.isTransition = false;

    that.transition = function() {
        if (!that.isTransition && that.expand) {
            var newThat = d3binding.binding();
            newThat.funcs = that.funcs;
            newThat.isTransition = true;
            return newThat;
        }
        return that;
    };

    that.attr = function(name, value) {
        return common(that, name, value, "attr");
    };

    that.style = function(name, value) {
        return common(that, name, value, "style");
    };

    that.classed = function(name, value) {
        return common(that, name, value, "classed");
    };

    that.text = function(value) {
        return common(that, null, value, "text");
    };

    that.html = function(value) {
        return common(that, null, value, "classed");
    };

    return that;
};

var common = function(that, name, value, funcname) {
    that.expand(function(selection) {
        selection[funcname](name, function(d) {
            var s = d3.select(this);
            var v = value;
            if (typeof v === "function") {
                v = v(d);
                if (sb.isObservable(v)) {
                    var o = v;
                    sb.binding(o)
                        .onChange(o, function() {
                            if (that.isTransition) {
                                if (name !== null) {
                                    (s.transition())[funcname](name, o());
                                } else {
                                    (s.transition())[funcname](o());
                                }
                            } else {
                                if (name !== null) {
                                    s[funcname](name, o());
                                } else {
                                    s[funcname](o());
                                }
                            }
                        }).bind();
                    v = o();
                }
            }

            return v;
        });
    });

    return that;
}

})();
