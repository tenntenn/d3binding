define(
	'd3binding/transform',
	[],
	function() {
		var o = sb.base.observable.isObservable; 
		function transform() {
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
					if (o(x) && o(y)) {
						translate.observable("translate("+x()+","+y()+")");
						translate.binding = sb.binding(translate.observable, x, y)
						.compute(translate.observable, function() {
							return "translate("+x()+","+y()+")";
						}).bind();
					}
					return that;
				}; 

				that.scale = function(sx, sy) {
					if (o(sx) && o(sy)) {
						scale.observable("scale("+sx()+","+sy()+")");
						scale.binding = sb.binding(scale.observable, sx, sy)
						.compute(scale.observable, function() {
							return "scale("+sx()+","+sy()+")";
						}).bind();
					}

					return that;
				};

				that.rotate = function(angle, cx, cy) {
					if (o(angle)) {

						if (o(cy) && o(cx)) {
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
					if (o(angle)) {
						skewX.observable("skewX("+angle()+")");
						skewX.binding = sb.binding(skewX.observable, angle)
						.compute(skewX.observable, function() {
							return "skewX("+angle()+")";
						}).bind();
					}

					return that;
				};

				that.skewY = function(angle) {
					if (o(angle)) {
						skewY.observable("skewY("+angle()+")");
						skewY.binding = sb.binding(skewY.observable, angle)
						.compute(skewY.observable, function() {
							return "skewY("+angle()+")";
						}).bind();
					}

					return that;
				};

				that.matrix = function(a, b, c, d, e, f) {
					if (o(a) && o(b) && o(c) && o(d) && o(e) && o(f)) {
						matrix.observable("matrix("+a()+","+b()+","+c()+","+d()+","+e()+","+f()+")");
						matrix.binding = sb.binding(matrix.observable, a, b, c, d, e, f)
						.compute(matrix.observable, function() {
							return "matrix("+a()+","+b()+","+c()+","+d()+","+e()+","+f()+")";
						}).bind();
					}

					return that;
				};

				return that;

		}

		return transform;
	}
);
