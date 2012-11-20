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
