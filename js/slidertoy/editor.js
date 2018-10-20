// Wall o sliders!

function Editor(holder) {
	// Create
	let canvas = $("#slidertoy-pview").find("canvas").get(0)
	this.material = new CanvasMaterial(canvas);

	this.evolveTime = 0;

	let section = createSection(holder, {
		title: "editor"
	});

	let modeHolder = $("<div/>", {
		class: "slidertoy-modes"
	}).appendTo(section.main)

	let modes = ["controls", "slow", "fast","notes", "hand", "face", "brain"]

	this.modeToggles = {}
	modes.map(m => {
		let button = $("<div/>", {
			class: "button slidertoy-mode slidertoy-mode-" + m,

		}).appendTo(modeHolder).css({
			backgroundImage: "url(css/icons/icon-" + m + ".png)"
		}).click(() => {
			this.setMode(m)
		});
		this.modeToggles[m] = button;
	});

	// Dropdown menu
	this.dropdown = $("<select/>", {
		html: Object.keys(types).map(key => "<option>" + key + "</option>")
	}).appendTo(section.controls).change(() => {
		console.log(this.dropdown.val())
		this.setType(this.dropdown.val());
	})


	// Audio view
	let audioBucketCount = 32;
	this.audioview = $("<div/>", {
		class: "slidertoy-audioview",
		html: "audio",
	}).appendTo(section.main)

	this.audioBuckets = [];
	for (var i = 0; i < audioBucketCount; i++) {
		let bucket = $("<div/>", {
			class: "slidertoy-audioview-bar"
		}).appendTo(this.audioview);
		let fill = $("<div/>", {
			class: "slidertoy-audioview-fill"
		}).appendTo(bucket).css({
			height: Math.random() * 100 + "%"
		});
		this.audioBuckets[i] = {
			div: bucket,
			fill: fill,
			val: 0
		}
	}


	this.sliderHolder = $("<div/>", {
		class: "slidertoy-sliders"
	}).appendTo(section.main)



	let type = "flower"



}


Editor.prototype.setMode = function(mode) {
	this.mode = mode;


	$(".slidertoy-mode").removeClass("active")
	this.modeToggles[mode].addClass("active")

	if (mode !== "slow" || mode !== "fast") {
		clearInterval(this.evolveInterval)
	}
	switch (mode) {
		case "slow":
		case "fast":

			this.evolveInterval = setInterval(() => {
				if (this.mode === "fast")
					this.evolveTime += .01;
				else
					this.evolveTime += .002;
				this.evolveArtifact(this.evolveTime);
			}, 50)

			break;
		case "hand":

			this.startLeap();
			break;
		case "controls":
			break;
		case "face":
			break;
		case "notes":
			break;

	};
	if (mode === "notes") {
		if (!this.dancer)
			this.startDancer();
		this.audioview.slideDown(300);
	} else {
		if (this.dancer)
			this.dancer.pause();
		this.audioview.slideUp(300);
	}
}

Editor.prototype.startLeap = function() {
	var controller = Leap.loop({
		enableGestures: false
	}, function(frame) {
		console.log(frame);
		//...
	});
}


Editor.prototype.startDancer = function() {
	console.log("load and start the dancer")
	this.dancer = new Dancer();

	this.dancer.load({
		src: 'audio/kamarinskaya.mp3'
	});

	this.dancer.play();
	this.dancerPaused = false;



	let danceCount = 0;
	let interval = setInterval(() => {
		if (!this.dancerPaused) {

			danceCount++;

			let spectrum = this.dancer.getSpectrum()
			let maxSpec = Math.floor(spectrum.length * .7);
			// Process 
			for (var i = 0; i < this.audioBuckets.length; i++) {
				this.audioBuckets[i].lastVal = this.audioBuckets[i].val;
				this.audioBuckets[i].val = 0;
			}
			for (var i = 0; i < maxSpec; i++) {
				let pct = i / maxSpec;
				let index = Math.floor(pct * this.audioBuckets.length)
				let p = Math.pow(10 * pct + .1, 1.7);
				this.audioBuckets[index].val += 4 * spectrum[i] * p
			}
			for (var i = 0; i < this.audioBuckets.length; i++) {
				let b = this.audioBuckets[i];
				let lerpVal = .2
				b.val = b.val * lerpVal + b.lastVal * (1 - lerpVal)
				b.val = Math.min(1, b.val);

				b.fill.css({
					height: (b.val) * 100 + "%"
				})

			}
			if (danceCount % 2 == 0) {
				let keys = Object.keys(this.artifact.dna)
				let vals = []
				for (var i = 0; i < keys.length; i++) {
					vals[i] = {
						val: 0,
						count: 0
					}
				}
				for (var i = 0; i < this.audioBuckets.length; i++) {
					let index = i % keys.length

					vals[index].val += this.audioBuckets[i].val;
					vals[index].count += 1;
				}

				for (var i = 0; i < keys.length; i++) {
					//console.log(vals[i])
					let v = vals[i].val/vals[i].count
					this.artifact.dna[keys[i]] = Math.pow(v, .4)
				}

				this.updateSliders();
			}
		}
	}, 20);


}

Editor.prototype.setType = function(typeID) {
	this.dropdown.val(typeID)
	this.type = types[typeID];

	this.sliderHolder.html("");
	this.sliders = this.type.sliders.map(sliderID => {

		let slider = new Slider(this.sliderHolder, {
			min: 0,
			max: 1,
			step: .1,
			label: sliderID,
			onSetValue: (v) => {
				//console.log(sliderID + ":" + v);
				this.updateValue(sliderID, v)
			}
		})
		slider.id = sliderID;
		return slider;
	})

	this.createArtifact();
}

Editor.prototype.updateValue = function(key, value) {

	if (this.artifact) {
		this.artifact.dna[key] = value;
		this.updateArtifact();
	}
}

Editor.prototype.createArtifact = function() {
	this.artifact = new Artifact(this.type);
	this.artifact.createGeometry(threeScene, this.material)


	this.updateSliders();
}

Editor.prototype.updateSliders = function() {

	this.sliders.forEach(slider => {
		slider.val(this.artifact.dna[slider.id], true)
	})
	this.updateArtifact();

}


Editor.prototype.updateArtifact = function() {
	processing.resetMatrix();
	this.artifact.draw(processing)
	this.artifact.updateGeometry(processing)
	this.material.update();

}

Editor.prototype.evolveArtifact = function(t) {


	let keys = Object.keys(this.artifact.dna)
	$.each(keys, (index, key) => {
		this.artifact.dna[key] = .5 + .5 * utilities.noise(t, index);
		//console.log(key + ": " + artifact.dna[key])
	})

	this.updateArtifact();
	this.updateSliders();


}