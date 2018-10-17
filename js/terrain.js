function Terrain() {
	// A new terrain obj
	this.size = 100;

	this.values = [];
	for (var i = 0; i < this.size; i++) {
		this.values[i] = [];
		for (var j = 0; j < this.size; j++) {
			this.values[i][j] = undefined;
		}

	}
}

// Set this terrain to some values (i keep adding tuning values, 
// so some of them are passed, and some are copied in from the global tuning variable, INELEGANT!!)
Terrain.prototype.setToValues = function(swSize, swIntensity, size, offset, seed) {
	Math.seedrandom(seed);
	let noise = new SimplexNoise();

	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			let x = i * tuning.size;
			let y = j * tuning.size;

			let swirlDetail = .4 + .1 * swIntensity;
			let r = 3 * swSize * noise.noise3D(x * swirlDetail, y * swirlDetail, 100 + tuning.swoffset + .01 * offset);
			let theta = 10 * swIntensity * noise.noise3D(x * swirlDetail, y * swirlDetail, 200 + tuning.swoffset + .01 * offset);

			x += r * Math.cos(theta);
			y += r * Math.sin(theta);
			let v = .5 + .5 * noise.noise3D(x, y, .01 * offset);

			let inversion = tuning.invertThreshold;
			v = Math.abs(v - inversion)
			
			this.values[i][j] = v;
		}
	}


}


// Draw into processing
Terrain.prototype.draw = function(g) {
	g.noStroke();
	let w = g.width / this.size;
	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			let v = this.values[i][j];
			g.fill(v);
			g.rect(i * w, j * w, w, w);
		}
	}
}