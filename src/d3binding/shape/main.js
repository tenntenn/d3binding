define(
	"d3binding/shape/main",
	[
		"d3binding/shape/Rect",
		"d3binding/shape/Circle"
	],
	function(Rect, Circle) {
		return {
			Rect: Rect,
			Circle: Circle
		};
	}
);
