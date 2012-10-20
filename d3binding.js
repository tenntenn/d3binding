var sb={};sb.BindingMaster=function(){var b=[];this.add=function(a){null===a||"undefined"===typeof a||0>b.indexOf(a)&&b.push(a)};this.notify=function(a,c){b.filter(function(a){var b=!1;Object.keys(a.inputs).forEach(function(e){a.inputs.hasOwnProperty(e)&&a.inputs[e]===c&&(b=!0)});return b});b.forEach(function(c){c.notify(a)})};this.remove=function(a){a=b.lastIndexOf(a);0<=a&&b.splice(a,1)}};sb.Binding=function(b,a,c,d){this.inputs=a;this.outputs=c;this.compute=d;this.bind=function(){b.add(this);return this};this.unbind=function(){b.remove(this);return this};this.notify=function(b){var e=d(a);Object.keys(e).forEach(function(a){var d=c[a];c.hasOwnProperty(a)&&"function"===typeof d&&d.notify(b,e[a])});return this}};sb.Observable=function(b,a){var c=function(b){void 0!==b&&c.notify([],b);return a};c.notify=function(d,f){0>d.lastIndexOf(c)&&(a=f,b.notify(d.concat(c),c))};c.prototype=sb.Observable;this.property=c};(function(){var b=new sb.BindingMaster;sb.binding=function(){var a,c,d=function(){var b={};Object.keys(c).forEach(function(d){Object.keys(a).forEach(function(e){e!==d&&a[e]()!==c[d]()&&(b[d]=a[e]())})});return b},f,e=[];for(arg in arguments)arguments[arg].prototype===sb.Observable&&e.push(arguments[arg]);e.length===arguments.length?(a={},e.forEach(function(b,c){a["observable"+c]=b}),c=a):1==arguments.length?(a=arguments[0],c=arguments[0]):2>=arguments.length?"function"===typeof arguments[1]?(f=arguments[1],
arguments[0].prototype===sb.Observable?(c=a={observable:arguments[0]},d=function(a){f(a.observable);return{}}):(a=arguments[0],c=arguments[0],d=arguments[1])):(a=arguments[0],c=arguments[1]):2<arguments.length&&(a=arguments[0],c=arguments[1],d=arguments[2]);return new sb.Binding(b,a,c,d)};sb.observable=function(a){return(new sb.Observable(b,a)).property}})();
/**
 * @namespace
 */
var d3binding = {};
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
(function() {
d3binding.binding = function() {

    var that = d3binding.expandable();
    that.isTransition = false;

    that.transition = function() {
        if (!that.isTransition && that.expand) {
            var newThat = d3binding.binding();
            newThat.expand(that.funcs);
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
    var newThat = that.expand(function(selection) {
        selection[funcname](name, function(d) {
            var s = d3.select(this);
            var v = value;
            if (typeof v === "function") {
                v = v(d);
                if (v.prototype === sb.Observable) {
                    var o = v;
                    sb.binding(o, function() {
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

    return newThat;
}

})();
