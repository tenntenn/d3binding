define(
	"d3binding/shape/Circle",
	[
		"d3binding/transform"
	],
	function(transform) {

		/**
		 * @class Circle
		 * @constructor
		 */
		function Circle(cx, cy, r) {
			this.cx = sb.observable(cx);
			this.cy = sb.observable(cy);
			this.r = sb.observable(r);
			this.transform = transform();
		}

		return Circle;
	}
);
