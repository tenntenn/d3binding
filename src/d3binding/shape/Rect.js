define(
	"d3binding/shape/Rect",
	[
		"d3binding/transform"
	],
	function(transform) {

		/**
		 * @class Rect
		 * @constructor
		 */
		function Rect(x, y, width, height) {
			this.x = sb.observable(x);
			this.y = sb.observable(y);
			this.width = sb.observable(width);
			this.height = sb.observable(height);
			this.color = sb.observable("red");
			this.angle = sb.observable(0);
			this.cx = sb.observable(this.width()/2);
			this.cy = sb.observable(this.height()/2);
			sb.binding(this.x, this.y, this.width, this.height, this.cx, this.cy)
				.computed(this.cx, function() {
					return this.width()/2;
				})
				._(this.cy, function() {
					return this.height()/2;
				});

			this.transform = transform()
				.translate(this.x, this.y)
				.rotate(this.angle, this.cx, this.cy);
		}

		return Rect;
	}
);
