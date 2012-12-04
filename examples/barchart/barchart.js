var data = [
	sb.observable(10),
	sb.observable(20),
	sb.observable(30),
	sb.observable(40)
];

var b = sb.d3.binding().transition()
.style("width", function(d) {
	var width = sb.observable(d() * 10 + "px");
	sb.binding(d).computed(width, function(){
		return d() * 10 + "px";
	}).bind();

	return width;
})
.text(function(d){
	return d;
});

var chart = d3.select('#chart');
chart.selectAll("div").data(data).enter().append("div").call(b);
var w = sb.observable(data[0]() * 10 + "px");

$('#add-btn').click(function(){
	data.forEach(function(d) {
		d(d() + 10);
	});
});
