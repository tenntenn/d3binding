var sb={BindingMaster:function(){var c=[];this.add=function(b){null===b||"undefined"===typeof b||0>c.indexOf(b)&&c.push(b)};this.notify=function(b,d){c.filter(function(a){var b=!1;Object.keys(a.inputs).forEach(function(c){a.inputs.hasOwnProperty(c)&&a.inputs[c]===d&&(b=!0)});return b}).forEach(function(a){a.notify(b)})};this.remove=function(b){b=c.lastIndexOf(b);0<=b&&c.splice(b,1)}},Binding:function(c,b,d,a){this.inputs=b;this.outputs=d;this.compute=a;this.bind=function(){c.add(this);return this};
this.unbind=function(){c.remove(this);return this};this.notify=function(c){var f=a(b),g=c[c.length-1];Object.keys(f).forEach(function(a){var b=d[a];g!==b&&(d.hasOwnProperty(a)&&sb.isObservable(b))&&b.notify(c,f[a])});return this}},Observable:function(c,b){var d=function(a){void 0!==a&&d.notify([],a);return b};d.notify=function(a,e){0>a.lastIndexOf(d)&&(b=e,c.notify(a.concat(d),d))};d.observable=this;this.property=d},isObservable:function(c){return c instanceof sb.Observable||c.observable&&c.observable instanceof
sb.Observable?!0:!1}};
(function(){sb.BindingChain=function(c,b){var d=[];this.synchronize=function(){var a=[],e=arguments;Object.keys(e).forEach(function(c){c=e[c];sb.isObservable(c)&&0<=b.indexOf(c)&&a.push(c)});a.forEach(function(b){var e={input:b},h={};a.forEach(function(a,c){b!==a&&(h["output"+c]=a)});e=new sb.Binding(c,e,h,function(a){var b={};Object.keys(h).forEach(function(c){b[c]=a.input()});return b});d.push(e)});return this};this.compute=function(a,e){if(!sb.isObservable(a)||"function"!==typeof e||0>b.indexOf(a))return this;
var f={};b.forEach(function(b,c){a!==b&&(f["input"+c]=b)});var g=new sb.Binding(c,f,{output:a},function(a){return{output:e(a)}});d.push(g);return this};this.onChange=function(a,e){if(!sb.isObservable(a)||"function"!==typeof e||0>b.indexOf(a))return this;var f=new sb.Binding(c,{input:a},{},function(){e();return{}});d.push(f);return this};this.bind=function(){d.forEach(function(a){a.bind()});return this};this.unbind=function(){d.forEach(function(a){a.unbind()});return this}}})();
(function(){var c=new sb.BindingMaster;sb.binding=function(){var b=[],d=arguments;Object.keys(d).forEach(function(a){a=d[a];sb.isObservable(a)&&b.push(a)});return new sb.BindingChain(c,b)};sb.observable=function(b){return(new sb.Observable(c,b)).property}})();
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
