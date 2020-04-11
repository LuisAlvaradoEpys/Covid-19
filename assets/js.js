$(function () {
	"use strict";
	
});
var Widgetschart = (function () {
	var t = function (t, e, a, r, n, i, o, s) {
		if ("undefined" != typeof d3) {
			if (t) {
				for (
					var d = d3.select(t),
						l = { top: 0, right: 0, bottom: 0, left: 0 },
						c =
							d.node().getBoundingClientRect().width -
							l.left -
							l.right,
						h = r - l.top - l.bottom,
						f = [],
						u = 0;
					u < a;
					u++
				)
					f.push(Math.floor(Math.random() * a) + 5);
				var p = d3.scale.linear().range([0, c]),
					m = d3.scale.linear().range([h - 5, 5]);
				p.domain([1, a - 3]), m.domain([0, a]);
				var g = d3.svg
						.line()
						.interpolate(n)
						.x(function (t, e) {
							return p(e);
						})
						.y(function (t, e) {
							return m(t);
						}),
					w = d3.svg
						.area()
						.interpolate(n)
						.x(function (t, e) {
							return p(e);
						})
						.y0(h)
						.y1(function (t) {
							return m(t);
						}),
					y = d.append("svg"),
					b = y
						.attr("width", c + l.left + l.right)
						.attr("height", h + l.top + l.bottom)
						.append("g")
						.attr(
							"transform",
							"translate(" + l.left + "," + l.top + ")"
						),
					x = b
						.append("defs")
						.append("clipPath")
						.attr("id", function (e, a) {
							return "load-clip-" + t.substring(1);
						})
						.append("rect")
						.attr("class", "load-clip")
						.attr("width", 0)
						.attr("height", h);
				x.transition().duration(1e3).ease("linear").attr("width", c);
				var v = b
					.append("g")
					.attr("clip-path", function (e, a) {
						return "url(#load-clip-" + t.substring(1) + ")";
					})
					.append("path")
					.datum(f)
					.attr("transform", "translate(" + p(0) + ",0)");
				function k() {
					(c =
						d.node().getBoundingClientRect().width -
						l.left -
						l.right),
						y.attr("width", c + l.left + l.right),
						b.attr("width", c + l.left + l.right),
						p.range([0, c]),
						x.attr("width", c),
						b.select(".d3-line").attr("d", g),
						b.select(".d3-area").attr("d", w);
				}
				"area" == e
					? v.attr("d", w).attr("class", "d3-area").style("fill", s)
					: v
							.attr("d", g)
							.attr("class", "d3-line d3-line-medium")
							.style("stroke", s),
					v
						.style("opacity", 0)
						.transition()
						.duration(500)
						.style("opacity", 1),
					setInterval(function () {
						f.push(Math.floor(Math.random() * a) + 5),
							f.shift(),
							v
								.attr("transform", null)
								.transition()
								.duration(i)
								.ease("linear")
								.attr("transform", "translate(" + p(0) + ",0)"),
							"area" == e
								? v
										.attr("d", w)
										.attr("class", "d3-area")
										.style("fill", s)
								: v
										.attr("d", g)
										.attr("class", "d3-line d3-line-medium")
										.style("stroke", s);
					}, o),
					$(window).on("resize", k),
					$(document).on("click", ".sidebar-control", k);
			}
		} else console.warn("Warning - d3.min.js is not loaded.");
	};
	return {
		init: function () {
			!(function (t, e, a, r, n, i, o, s, d) {
				if ("undefined" != typeof d3) {
					if (t) {
						for (var l = [], c = 0; c < e; c++)
							l.push(Math.round(10 * Math.random()) + 10);
						var h = d3.select(t),
							f = h.node().getBoundingClientRect().width,
							u = d3.scale.ordinal().rangeBands([0, f], 0.3),
							p = d3.scale.linear().range([0, a]);
						u.domain(d3.range(0, l.length)),
							p.domain([0, d3.max(l)]);
						var m = h.append("svg"),
							g = m
								.attr("width", f)
								.attr("height", a)
								.append("g"),
							w = g
								.selectAll("rect")
								.data(l)
								.enter()
								.append("rect")
								.attr("class", "d3-random-bars")
								.attr("width", u.rangeBand())
								.attr("x", function (t, e) {
									return u(e);
								})
								.style("fill", s),
							y = d3
								.tip()
								.attr("class", "d3-tip")
								.offset([-10, 0]);
						function b() {
							(f = h.node().getBoundingClientRect().width),
								m.attr("width", f),
								g.attr("width", f),
								u.rangeBands([0, f], 0.3),
								g
									.selectAll(".d3-random-bars")
									.attr("width", u.rangeBand())
									.attr("x", function (t, e) {
										return u(e);
									});
						}
						("hours" != d && "goal" != d && "members" != d) ||
							w
								.call(y)
								.on("mouseover", y.show)
								.on("mouseout", y.hide),
							"hours" == d &&
								y.html(function (t, e) {
									return (
										"<div class='text-center'><h6 class='mb-0'>" +
										t +
										"</h6><span class='font-size-16'>meetings</span><div class='font-size-16'>" +
										e +
										":00</div></div>"
									);
								}),
							"goal" == d &&
								y.html(function (t, e) {
									return (
										"<div class='text-center'><h6 class='mb-0'>" +
										t +
										"</h6><span class='font-size-16'>statements</span><div class='font-size-16'>" +
										e +
										":00</div></div>"
									);
								}),
							"members" == d &&
								y.html(function (t, e) {
									return (
										"<div class='text-center bg-dark p-5'><h6 class='mb-0'>" +
										t +
										"0</h6><span class='font-size-14'>members</span><div class='font-size-14'>" +
										e +
										":00</div></div>"
									);
								}),
							r
								? w
										.attr("height", 0)
										.attr("y", a)
										.transition()
										.attr("height", function (t) {
											return p(t);
										})
										.attr("y", function (t) {
											return a - p(t);
										})
										.delay(function (t, e) {
											return e * o;
										})
										.duration(i)
										.ease(n)
								: w
										.attr("height", function (t) {
											return p(t);
										})
										.attr("y", function (t) {
											return a - p(t);
										}),
							$(window).on("resize", b),
							$(document).on("click", ".sidebar-control", b);
					}
				} else console.warn("Warning - d3.min.js is not loaded.");
			})(
				"#chart_bar_basic",
				24,
				50,
				!0,
				"elastic",
				1200,
				50,
				"#5A8DEE",
				"members"
			),
				(function (t, e, a, r, n, i) {
					if ("undefined" != typeof d3) {
						if (t) {
							var o = [
									{ date: "04/13/14", alpha: "60" },
									{ date: "04/14/14", alpha: "35" },
									{ date: "04/15/14", alpha: "65" },
									{ date: "04/16/14", alpha: "50" },
									{ date: "04/17/14", alpha: "65" },
									{ date: "04/18/14", alpha: "20" },
									{ date: "04/19/14", alpha: "60" }
								],
								s = d3.select(t),
								d = { top: 0, right: 0, bottom: 0, left: 0 },
								l =
									s.node().getBoundingClientRect().width -
									d.left -
									d.right,
								c = e - d.top - d.bottom,
								h = 20,
								f = d3.time.format("%m/%d/%y").parse,
								u = d3.time.format("%a, %B %e"),
								p = d3
									.tip()
									.attr("class", "d3-tip")
									.html(function (t) {
										return (
											"<ul class='list-unstyled mb-1 bg-dark p-5'><li><div class='my-1'><i class='fa fa-check mr-2'></i>" +
											u(t.date) +
											"</div></li><li>Sales: &nbsp;<span class='float-right'>" +
											t.alpha +
											"</span></li><li>Revenue: &nbsp; <span class='float-right'>$" +
											(0 * t.alpha).toFixed(2) +
											"</span></li></ul>"
										);
									}),
								m = s.append("svg"),
								g = m
									.attr("width", l + d.left + d.right)
									.attr("height", c + d.top + d.bottom)
									.append("g")
									.attr(
										"transform",
										"translate(" +
											d.left +
											"," +
											d.top +
											")"
									)
									.call(p);
							o.forEach(function (t) {
								(t.date = f(t.date)), (t.alpha = +t.alpha);
							});
							var w = d3.time.scale().range([h, l - h]),
								y = d3.scale.linear().range([c, 5]);
							w.domain(
								d3.extent(o, function (t) {
									return t.date;
								})
							),
								y.domain([
									0,
									d3.max(o, function (t) {
										return Math.max(t.alpha);
									})
								]);
							var b = d3.svg
									.line()
									.x(function (t) {
										return w(t.date);
									})
									.y(function (t) {
										return y(t.alpha);
									}),
								x = g
									.append("defs")
									.append("clipPath")
									.attr("id", "clip-line-small")
									.append("rect")
									.attr("class", "clip")
									.attr("width", 0)
									.attr("height", c);
							x
								.transition()
								.duration(1e3)
								.ease("linear")
								.attr("width", l),
								g
									.append("path")
									.attr({
										d: b(o),
										"clip-path": "url(#clip-line-small)",
										class: "d3-line d3-line-medium"
									})
									.style("stroke", a),
								g
									.select(".line-tickets")
									.transition()
									.duration(1e3)
									.ease("linear");
							var v = g
								.append("g")
								.selectAll(".d3-line-guides-group")
								.data(o);
							v
								.enter()
								.append("line")
								.attr("class", "d3-line-guides")
								.attr("x1", function (t, e) {
									return w(t.date);
								})
								.attr("y1", function (t, e) {
									return c;
								})
								.attr("x2", function (t, e) {
									return w(t.date);
								})
								.attr("y2", function (t, e) {
									return c;
								})
								.style("stroke", r)
								.style("stroke-dasharray", "4,2")
								.style("shape-rendering", "crispEdges"),
								v
									.transition()
									.duration(1e3)
									.delay(function (t, e) {
										return 150 * e;
									})
									.attr("y2", function (t, e) {
										return y(t.alpha);
									});
							var k = g
								.insert("g")
								.selectAll(".d3-line-circle")
								.data(o)
								.enter()
								.append("circle")
								.attr(
									"class",
									"d3-line-circle d3-line-circle-medium"
								)
								.attr("cx", b.x())
								.attr("cy", b.y())
								.attr("r", 3)
								.style({ stroke: n, fill: i });
							function A() {
								(l =
									s.node().getBoundingClientRect().width -
									d.left -
									d.right),
									m.attr("width", l + d.left + d.right),
									g.attr("width", l + d.left + d.right),
									w.range([h, l - h]),
									x.attr("width", l),
									g.selectAll(".d3-line").attr("d", b(o)),
									g
										.selectAll(".d3-line-circle")
										.attr("cx", b.x()),
									g
										.selectAll(".d3-line-guides")
										.attr("x1", function (t, e) {
											return w(t.date);
										})
										.attr("x2", function (t, e) {
											return w(t.date);
										});
							}
							k
								.style("opacity", 0)
								.transition()
								.duration(250)
								.ease("linear")
								.delay(1e3)
								.style("opacity", 1),
								k
									.on("mouseover", function (t) {
										p.offset([-10, 0]).show(t),
											d3
												.select(this)
												.transition()
												.duration(250)
												.attr("r", 4);
									})
									.on("mouseout", function (t) {
										p.hide(t),
											d3
												.select(this)
												.transition()
												.duration(250)
												.attr("r", 3);
									}),
								d3
									.select(k[0][0])
									.on("mouseover", function (t) {
										p
											.offset([0, 10])
											.direction("e")
											.show(t),
											d3
												.select(this)
												.transition()
												.duration(250)
												.attr("r", 4);
									})
									.on("mouseout", function (t) {
										p.direction("n").hide(t),
											d3
												.select(this)
												.transition()
												.duration(250)
												.attr("r", 3);
									}),
								d3
									.select(k[0][k.size() - 1])
									.on("mouseover", function (t) {
										p
											.offset([0, -10])
											.direction("w")
											.show(t),
											d3
												.select(this)
												.transition()
												.duration(250)
												.attr("r", 4);
									})
									.on("mouseout", function (t) {
										p.direction("n").hide(t),
											d3
												.select(this)
												.transition()
												.duration(250)
												.attr("r", 3);
									}),
								$(window).on("resize", A),
								$(document).on("click", ".sidebar-control", A);
						}
					} else console.warn("Warning - d3.min.js is not loaded.");
				})(
					"#line_chart_simple",
					50,
					"#FDAC41",
					"#FDAC41",
					"#FDAC41",
					"#fff"
				),
				t(
					"#sparklines_basic",
					"area",
					30,
					50,
					"basis",
					750,
					2e3,
					"#FF5B5C"
				);
		}
	};
})();
document.addEventListener("DOMContentLoaded", function () {
	// 
	console.log("inicio");
	// setTimeout( function(){Widgetschart.init()}, 5000)



});
