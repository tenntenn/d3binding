d3binding.binding = function() {

    var that = d3binding.expandable(function(selection) {});
    that.isTransition = false;

    that.transition = function() {
        if (!that.isTransition) {
            var newThat = d3binding.expandable(that);
            for (key in that) {
                if (that.hasOwnProperty(key)) {
                    newThat[key] = that[key];
                }
            }
            newThat.isTransition = true;
            return newThat;
        }

        return that;
    };

    // 第一引数おかしいよ。
    var common = function(b, name, value, funcname) {
        b.expand(function(selection) {
            selection[funcname](name, function(d) {
                var s = d3.select(this);
                var v = value;
                if (typeof v === "function") {
                    v = v(d);
                    if (v.prototype === sb.Observable) {
                        var o = v;
                        sb.binding(o, function() {
                            if (b.isTransition) {
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

    that.attr = function(name, value) {
        return common(this, name, value, "attr");
    };

    that.style = function(name, value) {
        return common(this, name, value, "style");
    };

    that.classed = function(name, value) {
        return common(this, name, value, "classed");
    };

    that.text = function(value) {
        return common(this, null, value, "text");
    };
   
    that.html = function(value) {
        return common(this, null, value, "classed");
    };

    return that;
};
