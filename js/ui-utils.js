function CanvasMaterial(canvas) {
	this.canvas = canvas;
	this.image = new Image();
	this.image.src = 'data:image/jpeg;base64,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';

	this.texture = new THREE.Texture();
	this.texture.image = this.image;
	this.image.onload = () => {
		this.texture.needsUpdate = true;
	};

	this.texture.repeat.set(1, 1);
	this.texture.wrapS = this.texture.wrapT = THREE.MirroredRepeatWrapping;

	this.material = new THREE.MeshLambertMaterial({
		color: 0xFFFFFF,
		map: this.texture,
		side: THREE.DoubleSide
	});

	this.update();

}


CanvasMaterial.prototype.update = function() {
	
	// Update the texture
	let data = this.canvas.toDataURL();
	// img.attr("src", data);
	this.image.src = data;
}

//===================================================
// Create a slider with handlers
// Settings (min, max, default, step, label, tickcount, onSetValue)
function Slider(parent, settings) {
	$.extend(this, settings);
	if (this.power === undefined)
		this.power = 1;

	let holder = $("<div/>", {
		class: "slider-holder"
	}).appendTo(parent);

	// Header
	let header = $("<div/>", {
		class: "slider-header"
	}).appendTo(holder);

	this.labelDiv = $("<div/>", {
		class: "slider-label",
		html: settings.label
	}).appendTo(header);

	this.valueDiv = $("<div/>", {
		class: "slider-value"
	}).appendTo(header);

	let main = $("<div/>", {
		class: "slider-main"
	}).appendTo(holder);

	this.realMin = Math.pow(this.min, 1 / this.power)
	this.realMax = Math.pow(this.max, 1 / this.power)
	this.realDefault = Math.pow(this.value, 1 / this.power)

	this.slider = $("<div/>").appendTo(main).slider({
		min: this.realMin,
		max: this.realMax,
		min: 0,
		max: 1,
		slide: () => this.setVal(),
		stop: () => this.setVal(),
		//change: () => this.setVal(),
		step: .01,
		value: this.realDefault
	});



	if (this.tickCount) {

		let tickrow = $("<div/>", {
			class: "slider-tickrow",
		}).appendTo(main);

		let tickCount = this.tickCount;
		for (var i = 0; i < tickCount; i++) {
			let pct = i / (tickCount);
			let tickVal = (this.realMin + (this.realMax - this.realMin) * pct);
			if (this.power)
				tickVal = Math.pow(tickVal, this.power)

			tickVal = tickVal.toFixed(1);


			let tick = $("<div/>", {
				class: "slider-tick",
				html: tickVal
			}).appendTo(tickrow).css({
				left: (pct * 98 + 1) + "%"
			});
		}
	}

	this.setVal(undefined, true);
}

Slider.prototype.val = function(v, skipHandler) {
	if (v !== undefined) {
		this.setVal(v, skipHandler)
	} else {
		let v2 = this.slider.slider("value")
		if (this.power)
			v2 = Math.pow(v2, this.power)
		return v2;
	}
}

Slider.prototype.setVal = function(v, skipHandler) {
	if (v !== undefined) {
		// Set to a particular value
		if (this.power) {
			v = Math.pow(v, 1 / this.power);

		}
		this.slider.slider("value", v);
	}

	let v2 = this.val();



	let vFormatted = v2;
	// Is there a non-integer step value?
	if (this.step && this.step < 1) {
		vFormatted = v2.toFixed(2);
	}

	this.valueDiv.html(vFormatted)

	if (this.onSetValue && !skipHandler)
		this.onSetValue(v2);
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


function createEditableTable(holder, settings) {
	let table = $("<table/>", {
		class: "table " + (settings.classes ? settings.classes : ""),
		id: settings.id
	}).appendTo(holder);

	table.rows = mapObject(settings.rows, (obj, key) => {
		let row = $("<tr/>").appendTo(table);
		row.label = $("<td/>", {
			html: key
		}).appendTo(table);
		row.value = $("<td/>", {
			html: obj.type
		}).appendTo(table);

		row.editor = $("<td/>", {}).appendTo(table);

		let updateInput = () => {
			if (row.editorInput) {
				let v = row.editorInput.val();
				settings.onChange(key, v, row.lastValue)
				row.lastValue = v;
			}
		}
		switch (obj.type) {
			case "string":
				row.editorInput = $("<input/>").appendTo(row.editor).change(updateInput).keyup(updateInput);
				break;
			case "select":
				row.editorInput = $("<select/>", {
					html: obj.options.map((option) => "<option val='" + option + "'>" + option + "</option>")
				}).appendTo(row.editor).change(updateInput);
				break;
			case "int":
				row.editorInput = new Slider(row.editor, {
					min: obj.min,
					max: obj.max,
					onSetValue: updateInput
				});
				break;
			default:
				console.warn("Unknown table value-type:" + obj.type)

		}

		return row;
	})
	return table;
}

function createSection(holder, settings) {
	let section = $("<div/>", {
		class: "section " + (settings.classes ? settings.classes : ""),
		id: settings.id
	}).appendTo(holder);

	section.header = $("<div/>", {
		class: "section-header",
	}).appendTo(section);

	section.main = $("<div/>", {
		class: "section-main",
	}).appendTo(section);

	section.footer = $("<div/>", {
		class: "section-footer",
	}).appendTo(section);

	section.title = $("<div/>", {
		class: "section-title",
		html: settings.title,
	}).appendTo(section.header);

	section.controls = $("<div/>", {
		class: "section-controls",
	}).appendTo(section.header);
	return section;

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
	return arr[Math.floor(Math.random() * arr.length)];
}

//=====================================
// Event handlers: todo: does not handle removing

function addEventHandler(event, owner, fxn) {
	if (this.eventHandlers === undefined) {
		this.eventHandlers = {};
	}
	if (this.eventHandlers[event] === undefined) {
		this.eventHandlers[event] = [];
	}

	this.eventHandlers[event].push({
		fxn: fxn,
		owner: owner
	})
}

function removeEventHandlers(owner) {
	// TODO remove event handlers
	console.warn("TODO remove event handlers ")
}

function doEventHandlers(event, ...params) {

	if (this.eventHandlers && this.eventHandlers[event]) {
		let fxns = this.eventHandlers[event];
		for (var i = 0; i < fxns.length; i++) {
			fxns[i].fxn.apply(this, params);
		}
	}

}

//=====================================
// Play with objects

function mapArrayToObj(arr, keyFxn, valFxn) {
	let obj2 = {}
	for (var i = 0; i < arr.length; i++) {
		let val = arr[i];

		let key = keyFxn(val, i);
		obj2[key] = valFxn(val, i);


	}
	return obj2
}

function mapObject(obj, fxn) {
	let obj2 = {}
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {

			obj2[key] = fxn(obj[key], key);
		}
	}
	return obj2
}



function mapObjectToArray(obj, fxn) {


	let obj2 = []
	for (let key in obj) {

		if (obj.hasOwnProperty(key)) {
			obj2.push(fxn(obj[key], key));
		}
	}
	return obj2
}


function inQuotes(s) {
	return '"' + s + '"';
}

function inParens(s) {
	return '(' + s + ')';
}


function toTag(tagName, attributes, contents) {
	var s = "<" + tagName;
	if (attributes) {

		if (Array.isArray(attributes)) {
			$.each(attributes, function(key, attr2) {
				if (attr2 !== undefined) {
					$.each(attr2, function(key, val) {
						s += " " + key + "=" + inQuotes(val);
					});
				}
			});
		} else {

			$.each(attributes, function(key, val) {
				s += " " + key + "=" + inQuotes(val);
			});
		}
	}
	s += ">" + (contents ? contents : "") + "</" + tagName + ">";
	return s;
}

//=================================================================
//=================================================================
//=================================================================
// Kates color class

function KColor(h, s, b, a) {
	if (Array.isArray(h)) {
		this.h = h[0];
		this.s = h[1];
		this.b = h[2];
		this.a = 1;
	} else {
		this.h = h;
		this.s = s;
		this.b = b;
		if (a !== undefined)
			this.a = a;
		else
			this.a = 1;
	}
};

// Add lots of utilty, modification, lerping, etc functions to deal with colors

KColor.prototype.toString = function() {
	return "hsb: " + this.h.toFixed(2) + " " + this.s.toFixed(2) + " " + this.b.toFixed(2) + " " + this.a.toFixed(2);

};

KColor.prototype.clone = function() {
	return new KColor(this.h, this.s, this.b, this.a);
}

KColor.prototype.constrainToUnit = function(v) {
	return Math.min(Math.max(v, 0), 1);
};

KColor.prototype.cloneShade = function(shade, fade, hueShift) {
	var clone;

	this.use(function(h, s, b, a) {
		clone = new KColor(h, s, b, a);
	}, shade, fade, hueShift);

	return clone;
};

// shade goes from -1 to 1, as does fade.
KColor.prototype.fill = function(g, shade, fade, hueShift) {

	return this.use(g.fill, shade, fade, hueShift);
};

KColor.prototype.stroke = function(g, shade, fade, hueShift) {
	return this.use(g.stroke, shade, fade, hueShift);
};

KColor.prototype.background = function(g, shade, fade, hueShift) {
	return this.use(g.background, shade, fade, hueShift);
};

KColor.prototype.use = function(gFunc, shade, fade, hueShift) {

	var s1 = this.s;
	var h1 = this.h;
	var b1 = this.b;
	var a1 = this.a;


	if (shade !== undefined) {
		if (shade > 0) {
			s1 = this.constrainToUnit(s1 - shade * (s1));
			b1 = this.constrainToUnit(b1 + shade * (1 - b1));
		} else {
			s1 = this.constrainToUnit(s1 - shade * (1 - s1));
			b1 = this.constrainToUnit(b1 + shade * (b1));
		}

		h1 = (h1 + -.06 * shade + 1) % 1;
	}

	// Increase (or decrease) the alpha for this
	if (fade !== undefined) {
		if (fade < 0) {
			a1 = this.constrainToUnit(a1 * (1 + fade));
		} else {
			a1 = this.constrainToUnit((1 - a1) * fade + a1);
		}

	}
	if (hueShift !== undefined) {

		h1 = (this.h + 100 + hueShift) % 1
	}

	gFunc(h1, s1, b1, a1);
};

KColor.HSVtoRGB = function(h, s, v) {
	var r,
		g,
		b;
	h *= 6;
	h = h % 6;

	var i = Math.floor(h);
	var f = h - i;
	var p = v * (1 - s);
	var q = v * (1 - (s * f));
	var t = v * (1 - (s * (1 - f)));
	if (i == 0) {
		r = v;
		g = t;
		b = p;
	} else if (i == 1) {
		r = q;
		g = v;
		b = p;
	} else if (i == 2) {
		r = p;
		g = v;
		b = t;
	} else if (i == 3) {
		r = p;
		g = q;
		b = v;
	} else if (i == 4) {
		r = t;
		g = p;
		b = v;
	} else if (i == 5) {
		r = v;
		g = p;
		b = q;
	}
	r = Math.floor(r * 255);
	g = Math.floor(g * 255);
	b = Math.floor(b * 255);
	return [r, g, b];
}

KColor.prototype.toCSS = function(shade, fade) {

	if (shade !== undefined) {
		var css;
		this.use(function(h, s, b, a) {
			var rgb = KColor.HSVtoRGB(h, s, b, a);
			var vals = "";
			$.each(rgb, function(index, val) {
				vals += Math.round(val) + ", ";
			});
			vals += a;
			css = "rgba(" + vals + ")";
		}, shade, fade);

		return css;
	}

	var rgb = utilities.HSVtoRGB(this.h, this.s, this.b, this.a);
	var vals = "";
	$.each(rgb, function(index, val) {
		vals += Math.round(val) + ", ";
	});
	vals += this.a;
	return "rgba(" + vals + ")";
};
KColor.prototype.toThree = function(shade, fade) {

	if (shade !== undefined) {
		var css;
		this.use(function(h, s, b, a) {
			var rgb = utilities.HSVtoRGB(h, s, b, a);
			css = "rgb(" + Math.round(rgb[0]) + ", " + Math.round(rgb[1]) + ", " + Math.round(rgb[2]) + ")";
		}, shade, fade);

		return new THREE.Color(css);
	}

	var rgb = utilities.HSVtoRGB(this.h, this.s, this.b, this.a);
	var vals = "";
	var css = "rgb(" + Math.round(rgb[0]) + ", " + Math.round(rgb[1]) + ", " + Math.round(rgb[2]) + ")";
	// console.log(css);
	return new THREE.Color(css);
};

var toHexString = function(v) {
	var v2 = v.toString(16);
	if (v2.length == 0)
		v2 = "0" + v2;
	if (v2.length == 1)
		v2 = "0" + v2;
	return v2;
};

KColor.prototype.toRGB = function() {
	return toRGB(this.h, this.s, this.b);
};

KColor.prototype.toHex = function() {
	var rgb = utilities.HSVtoRGB(this.h, this.s, this.b, this.a);

	var hex = rgb[0] << 16 | rgb[1] << 8 | rgb[2];
	hex = toHexString(rgb[0]) + toHexString(rgb[1]) + toHexString(rgb[2]);
	return hex;
};

KColor.prototype.toRGBString = function() {
	var rgb = this.toRGB();

	return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
};

KColor.makeIDColor = function(idNumber) {
	return new KColor((idNumber * .31299 + .42) % 1, 1, 1);
};