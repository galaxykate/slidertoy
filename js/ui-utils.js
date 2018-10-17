// Create a slider with handlers
function Slider(parent, settings) {
	let holder = $("<div/>", {
		class: "slider-holder"
	}).appendTo(parent);

	// Header
	let header = $("<div/>", {
		class: "slider-header"
	}).appendTo(holder);

	let label = $("<div/>", {
		class: "slider-label",
		html: settings.label
	}).appendTo(header);

	let value = $("<div/>", {
		class: "slider-value"
	}).appendTo(header);

	let main = $("<div/>", {
		class: "slider-main"
	}).appendTo(holder);

	function setVal() {
		let v = slider.slider("value")


		if (settings.power)
			v = Math.pow(v, settings.power)


		let vFormatted = v;
		// Is there a non-integer step value?
		if (settings.step && settings.step < 1) {
			vFormatted = v.toFixed(2);
		}

		value.html(vFormatted)

		if (settings.onSetValue)
		settings.onSetValue(v);
	}

	let slider = $("<div/>").appendTo(main).slider({
		min: settings.min,
		max: settings.max,
		slide: setVal,
		stop: setVal,
		change: setVal,
		step: settings.step,
		value: settings.default
	});



	if (settings.tickCount) {

		let tickrow = $("<div/>", {
			class: "slider-tickrow",
		}).appendTo(main);

		let tickCount = settings.tickCount;
		for (var i = 0; i < tickCount; i++) {
			let pct = i / (tickCount);
			let tickVal = (settings.min + (settings.max - settings.min) * pct);
			if (settings.power)
				tickVal = Math.pow(tickVal, settings.power)

			// Is there a non-integer step value?
			if (settings.step && settings.step < 1) {
				tickVal = tickVal.toFixed(2);
			}

			let tick = $("<div/>", {
				class: "slider-tick",
				html: tickVal
			}).appendTo(tickrow).css({
				left: (pct * 98 + 1) + "%"
			});
		}
	}

	setVal()
}

//======================================================================

// Utility class for calculating animation time (keep track of frame count, etc)
function AnimTime() {
	this.start = Date.now() * .001;
	this.current = this.start;
	this.elapsed = .01;
	this.frame = 0;

}

AnimTime.prototype.update = function() {
	this.last = this.current;
	this.current = Date.now() * .001 - this.start;

	this.elapsed = Math.min(Math.max(this.current - this.last, .001), .1);
	this.frame++;
}


// control the processing view
function createProcessing(holder, onUpdate, onDraw, onStart) {

	var canvas = $("<canvas/>").appendTo(holder).css({
		width: "100%",
		height: "100%",
		left: "0px",
		top: "0px",
		position: "absolute"
	});


	var processingInstance = new Processing(canvas.get(0), function(g) {

		// Set the size of processing so that it matches that size of the canvas element
		var w = canvas.width();
		var h = canvas.height();

		let time = new AnimTime()

		g.size(w, h);
		g.colorMode(g.HSB, 1);
		g.ellipseMode(g.CENTER_RADIUS);
		if (onStart) {
			g.pushMatrix();
			g.translate(w / 2, h / 2);
			onStart(g, time);
			g.popMatrix();
		}

		g.draw = function() {
			time.update();

			onUpdate(time, g);



			g.pushMatrix();
			g.translate(w / 2, h / 2);

			onDraw(g, time);
			g.popMatrix();

		};
	});

}
//http://jsfromhell.com/array/shuffle
function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
	return a;
}


function getRandom(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}