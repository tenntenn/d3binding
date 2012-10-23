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
(function(){
    d3binding.transform = function() {

        var that = sb.observable("");

        var translate = {
            binding : null,
            observable : sb.observable("")
        };

        var scale = {
            binding : null,
            observable : sb.observable("")
        };

        var rotate = {
            binding : null,
            observable : sb.observable("")
        };

        var skewX = {
            binding : null,
            observable : sb.observable("")
        };

        var skewY = {
            binding : null,
            observable : sb.observable("")
        };

        var matrix = {
            binding : null,
            observable : sb.observable("")
        };

        sb.binding(
            that,
            translate.observable,
            scale.observable,
            rotate.observable,
            skewX.observable,
            skewY.observable,
            matrix.observable)
            .compute(that, function() {
                var results = [];

                if (translate.observable()) {
                    results.push(translate.observable());
                }

                if (scale.observable()) {
                    results.push(scale.observable());
                }

                if (rotate.observable()) {
                    results.push(rotate.observable());
                }

                if (skewX.observable()) {
                    results.push(skewX.observable());
                }

                if (skewY.observable()) {
                    results.push(skewY.observable());
                }

                if (matrix.observable()) {
                    results.push(matrix.observable());
                }

                return results.join(" ");
            }).bind();

        that.translate = function(x, y) {
            if (sb.isObservable(x)
                    && sb.isObservable(y)) {
                translate.observable("translate("+x()+","+y()+")");
                translate.binding = sb.binding(translate.observable, x, y)
                    .compute(translate.observable, function() {
                        return "translate("+x()+","+y()+")";
                    }).bind();
            }
            return that;
        }; 

        that.scale = function(sx, sy) {
             if (sb.isObservable(sx)
                    && sb.isObservable(sy)) {
                scale.observable("scale("+sx()+","+sy()+")");
                scale.binding = sb.binding(scale.observable, sx, sy)
                    .compute(scale.observable, function() {
                        return "scale("+sx()+","+sy()+")";
                    }).bind();
            }

            return that;
        };

        that.rotate = function(angle, cx, cy) {
            if (sb.isObservable(angle)) {

                if (sb.isObservable(cy)
                        && sb.isObservable(cx)) {
                    rotate.observable("rotate("+angle()+","+cx()+","+cy()+")");
                    rotate.binding = sb.binding(rotate.observable, angle, cx, cy)
                        .compute(rotate.observable, function() {
                            return "rotate("+angle()+","+cx()+","+cy()+")";
                        }).bind();
                } else {
                    rotate.observable("rotate("+angle()+")");
                    rotate.binding = sb.binding(rotate.observable, angle)
                        .compute(rotate.observable, function() {
                            return "rotate("+angle()+")";
                        }).bind();
                }
            }
 
            return that;
        };

        that.skewX = function(angle) { 
            if (sb.isObservable(angle)) {
                skewX.observable("skewX("+angle()+")");
                skewX.binding = sb.binding(skewX.observable, angle)
                    .compute(skewX.observable, function() {
                        return "skewX("+angle()+")";
                    }).bind();
            }

            return that;
        };

        that.skewY = function(angle) {
            if (sb.isObservable(angle)) {
                skewY.observable("skewY("+angle()+")");
                skewY.binding = sb.binding(skewY.observable, angle)
                    .compute(skewY.observable, function() {
                        return "skewY("+angle()+")";
                    }).bind();
            }

            return that;
        };

        that.matrix = function(a, b, c, d, e, f) {
            if (sb.isObservable(a)
                    && sb.isObservable(b)
                    && sb.isObservable(c)
                    && sb.isObservable(d)
                    && sb.isObservable(e)
                    && sb.isObservable(e)) {
                matrix.observable("matrix("+a()+","+b()+","+c()+","+d()+","+e()+","+f()+")");
                matrix.binding = sb.binding(matrix.observable, a, b, c, d, e, f)
                    .compute(matrix.observable, function() {
                        return "matrix("+a()+","+b()+","+c()+","+d()+","+e()+","+f()+")";
                    }).bind();
            }

            return that;
        };

        return that;
    };
})();
