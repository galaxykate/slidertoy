let tuning = {}

// This event fires when the page is loaded 
// (ie, all the divs are placed, css is applied, and libraries are loaded)
$(function() {
	// Create the terrain object 
	let terrain = new Terrain();
	let graphics;


	let sliderHolder = $("#section-editor .section-main");

	let sliderData = {
		invertThreshold: {
			label: "Inversion Threshold",
			tooltip: "adjusts swirliness",
			min: 0,
			max: 1,
			step: .01,
			default: .3,
			tickCount: 6,
		},
		swirl: {
			label: "Swirl Size",
			tooltip: "adjusts swirliness",
			min: 0,
			max: 1,
			step: .01,
			default: .35,
			power: 1.2, // Sometimes its handy to have a non-linear scale
			tickCount: 6,
		},
		intensity: {
			label: "Swirl Intensity",
			tooltip: "adjusts some size of something",
			min: 0,
			max: 2,
			step: .1,
			default: 1,
			power: 1.2, // Sometimes its handy to have a non-linear scale
			tickCount: 6,
		},
		swoffset: {
			label: "Swirl Offset",
			tooltip: "adjusts some size of something",
			min: 0,
			max: 2,
			step: .01,
			default: 1,
			tickCount: 6,
		},
		size: {
			label: "Size",
			tooltip: "adjusts some size of something",
			default: .03,
			min: .010,
			max: .0500,
			step: .001,
			tickCount: 5,
		},
		offset: {
			label: "Offset",
			tooltip: "some offset?",
			default: 0,
			min: -100,
			max: 100,
			tickCount: 5,
		},
		seed: {
			label: "Seed value",
			tooltip: "generation seed",
			default: 1,
			min: 0,
			max: 1000,
			tickCount: 10,
		}
	}

	// Create each slider with this data
	$.each(sliderData, (key, data) => {

		// When we change this value, update the tuning parameters
		// And also redraw the terrain
		data.onSetValue = (v) => {
			tuning[key] = v;
			setTerrainToCurrentTuning();
		}
		let s = new Slider(sliderHolder, data)
	})


	// Lets make a processing window, for funsies 
	// createProcessing is a utility fxn I made for using processing
	// it has 3 handlers, for updating, drawing, and initializing (<- run once)
	let pHolder = $("<div/>", {}).css({
		width: 300,
		height: 300,
		position: "relative"
	}).appendTo($("#section-view .section-main"))

	createProcessing(pHolder, t => {
		// Update

	}, g => {}, g => {
		g.background(1, 1, 1);

		// save this
		graphics = g;
	});



	// swSize, swIntensity, size, offset, seed
	function setTerrainToCurrentTuning() {
		terrain.setToValues(tuning.swirl, tuning.intensity, tuning.size, tuning.offset, tuning.seed)
		if (graphics)
			terrain.draw(graphics);
	}
	setTerrainToCurrentTuning();
});