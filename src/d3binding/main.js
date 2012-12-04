define(
	'd3binding/main',
	[
		'd3binding/binding',
		'd3binding/transform',
		'd3binding/shape/main'
	],
	function(binding, transform, shape) {
		return {
			binding: binding,
			transform: transform,
			shape: shape
		};
	}
);
