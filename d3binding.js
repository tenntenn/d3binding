var sb={expandable:function(){var d=function(){var c=sb.argumentsToArray(arguments);d.funcs.forEach(function(e){e.apply(d,c)})},a=sb.argumentsToArray(arguments);d.funcs=a.filter(function(c){return"function"===typeof c});d.expand=function(c){"function"===typeof c&&d.funcs.push(c);return d};return d},Observer:function(){var d=[];this.add=function(a){null===a||"undefined"===typeof a||0>d.indexOf(a)&&d.push(a)};this.notify=function(a,c){d.filter(function(e){var b=!1;Object.keys(e.inputs).forEach(function(a){e.inputs.hasOwnProperty(a)&&
e.inputs[a]===c&&(b=!0)});return b}).forEach(function(c){c.notify(a)})};this.remove=function(a){a=d.lastIndexOf(a);0<=a&&d.splice(a,1)}},Binding:function(d,a,c,e){var b=this;b.inputs=a;b.outputs=c;b.computed=e;b.bind=function(){d.add(b);return b};b.unbind=function(){d.remove(b);return b};b.notify=function(d){var g=e(a),h=d[d.length-1];Object.keys(g).forEach(function(b){var a=c[b];h!==a&&(c.hasOwnProperty(b)&&sb.isObservable(a))&&a.notify(d,g[b])});return b}},isObservable:function(d){return"function"!==
typeof d||!d.notify||"function"!==typeof d.notify?!1:!0},Observable:function(d,a){var c=this;c.property=function(d){void 0!==d&&c.property.notify([],d);return a};c.property.notify=function(e,b){0>e.lastIndexOf(c.property)&&(a=b,d.notify(e.concat(c.property),c.property))}}};
(function(){sb.ObservableArray=function(d,a){var c=this,e=a;e instanceof Array||(e=[]);c.property=function(){return e.concat()};c.property.notify=function(b){0>b.lastIndexOf(c.property)&&d.notify(b.concat(c.property),c.property)};c.property.length=function(){return e.length};c.property.get=function(b){return e[b]};c.property.set=function(b,a){e[b]=a;c.property.notify([])};"push pop shift unshift splice reverse sort".split(" ").forEach(function(b){"function"===typeof e[b]&&(c.property[b]=function(){var a=
sb.argumentsToArray(arguments),a=e[b].apply(e,a);c.property.notify([]);return a})});["concat","map","filter"].forEach(function(b){"function"===typeof e[b]&&(c.property[b]=function(){var a=sb.argumentsToArray(arguments),a=e[b].apply(e,a);return new sb.ObservableArray(d,a)})});"join toString toLocalString indexOf lastIndexOf forEach".split(" ").forEach(function(b){"function"===typeof e[b]&&(c.property[b]=function(){var a=sb.argumentsToArray(arguments);return e[b].apply(e,a)})})}})();
(function(){sb.BindingChain=function(d,a){var c=sb.expandable(),e=[];this.synchronize=function(){var b=[];sb.argumentsToArray(arguments).forEach(function(c){sb.isObservable(c)&&(b.push(c),0>a.indexOf(c)&&a.push(c))});var f=b.map(function(a){var c={input:a},e={};b.forEach(function(b,c){a!==b&&(e["output"+c]=b)});return new sb.Binding(d,c,e,function(b){var a={};Object.keys(e).forEach(function(c){a[c]=b.input()});return a})});c.expand(function(){e=e.concat(f)});return this};this.computed=function(b,
f){if(!sb.isObservable(b)||"function"!==typeof f)return this;0>a.indexOf(b)&&a.push(b);c.expand(function(){var c={};a.forEach(function(a,d){b!==a&&(c["input"+d]=a)});var h=new sb.Binding(d,c,{output:b},function(a){return{output:f(a)}});e.push(h)});return this};this.onChange=function(b,f){if(!sb.isObservable(b)||"function"!==typeof f)return this;a.indexOf(b)&&a.push(b);var g=new sb.Binding(d,{input:b},{},function(){f();return{}});c.expand(function(){e.push(g)});return this};this.bind=function(){this.unbind();
c();e.forEach(function(a){a.bind()});return this};this.unbind=function(){e.forEach(function(a){a.unbind()});e=[];return this}}})();sb.argumentsToArray=function(d){var a=[];Object.keys(d).forEach(function(c){a.push(d[c])});return a};
(function(){var d=new sb.Observer;sb.binding=function(){var a=sb.argumentsToArray(arguments).filter(function(a){return sb.isObservable(a)});return new sb.BindingChain(d,a)};sb.observable=function(a){return(new sb.Observable(d,a)).property};sb.observableArray=function(a){return(new sb.ObservableArray(d,a)).property}})();
/**
 * @namespace
 */
var d3binding = {};
(function() {
d3binding.binding = function() {

    var that = sb.expandable();
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
