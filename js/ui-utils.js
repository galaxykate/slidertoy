// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
String.prototype.hashCode = function() {
	var hash = 0,
		i, chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};



function createLabelData(holder, settings) {
	let div = $("<div/>", {
		class: "labeldata " + (settings.classes || ""),
	}).appendTo(holder)

	div.label = $("<div/>", {
		class: "labeldata-label",
		html: settings.label
	}).appendTo(div)

	div.value = $("<div/>", {
		class: "labeldata-value",
		html: settings.value
	}).appendTo(div)
	return div;
}

function getIntersection(arr0, arr1) {
	let s = {
		s0: [],
		s1: [],
		both: []
	}

	let found = {}

	for (var i = 0; i < arr0.length; i++) {
		found[arr0[i]] = 1;
	}
	for (var i = 0; i < arr1.length; i++) {
		let v = arr1[i]
		if (found[v]) {
			s.both.push(v)
			found[v] = 0
		} else
			s.s1.push(v)
	}
	s.s0 = Object.keys(found).filter(key => found[key] == 1)

	return s;
}

let selectedUI = undefined

function globalSelect(ui, obj) {
	$(".selected").removeClass("selected")
	let prevUI = selectedUI
	selectedUI = ui
	if (selectedUI !== undefined) {

		if (selectedUI === prevUI) {
			selectedUI.removeClass("selected")
			selectedUI = undefined;
		}
		else {
			console.log("select ", obj)
			selectedUI.addClass("selected")
		}
	}
}

function toCamelCase(str) {

	str = str.replace(/[.,'"-:;?]/g, "");
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return "";
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	});
}



//https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server

function downloadTextAsFile(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function ToggleButton(holder, settings) {
	this.state = settings.default;
	if (this.state === undefined)
		this.state = false;

	this.button = $("<button/>", {
		class: "togglebutton " + (settings.classes || ""),
		html: settings.buttonLabel || ""
	}).appendTo(holder).click(() => {
		this.setTo(!this.state)
	});
	this.onChange = settings.onChange;
}

ToggleButton.prototype.setTo = function(state) {
	this.state = state;
	if (this.state)
		this.button.addClass("active")
	else
		this.button.removeClass("active")
	this.onChange(this.state);
}


function CanvasMaterial(canvas) {
	this.canvas = canvas;
	this.image = new Image();

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

function createRow(holder, settings) {
	let row = $("<div/>", {
		class: "row " + (settings.classes ? settings.classes : ""),
		id: settings.id
	}).appendTo(holder);

	row.header = $("<div/>", {
		class: "row-header",
	}).appendTo(row);

	row.content = $("<div/>", {
		class: "row-content",
	}).appendTo(row);

	row.label = $("<div/>", {
		html: settings.title,
		class: "row-label",
	}).appendTo(row.content);

	row.main = $("<div/>", {
		class: "row-main",
	}).appendTo(row.content);

	row.controls = $("<div/>", {
		class: "row-controls",
	}).appendTo(row.content);
	return row;
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
	if (typeof fxn !== "function")
		console.warn("Non-fxn handler!", fxn)
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