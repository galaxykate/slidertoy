function getHeight(dna, xPct, yPct) {

	let s1 = dna.swirlScale0 * .1+ .1;
	let s2 = dna.swirlScale1 * 3 + .1;
	let x1 = xPct * s1 + 100;
	let y1 = yPct * s1 + 100;
	let x2 = xPct * s2 + 200;
	let y2 = yPct * s2 + 200;
	let r = .2*dna.swirlScale0*dna.swirlSize * (1 + utilities.noise(x1, y1, dna.offset));
	let theta = dna.swirlSpin * 20 * utilities.noise(x2, y2);
	let scale = dna.noiseScale * 5;

	let x = scale * xPct + r * Math.cos(theta);
	let y = scale * yPct + r * Math.sin(theta);
	let h = utilities.noise(x, y, dna.offset)*.5 + .5;
	if (h < dna.inflection)
		h =  Math.abs(h - dna.inflection) + dna.inflection
	return h;
}

types.terrain = {
	sliders: ["groundColor", "groundShift", "inflection", "offset", "swirlSize", "swirlSpin", "swirlScale0", "swirlScale1", "noiseScale"],

	draw: function(dna, g) {
		g.background()

		let tiles = 50;
		let s = g.height / tiles;
		g.noStroke();

		g.loadPixels();
		for (var i = 0; i < g.width; i++) {
			for (var j = 0; j < g.height; j++) {
				let xPct = i / g.width;
				let yPct = j / g.height;

				let h = getHeight(dna, xPct, yPct);

				let shift = dna.groundColor;

				let hue = (6*Math.pow(shift, 3)*utilities.noise(h, dna.groundShift) + 100)%1;
				// g.fill(h, 1, 1)
				// g.rect(i * s, j * s, s, s);
				let pastel = .5 + .2 * Math.sin(h * 20);
				g.pixels.setPixel(i * g.height + j, g.color(hue, 1, 1.5 - pastel, pastel))
			}
		}

		g.updatePixels();


	},

	createGeometry: function(scene, canvasMaterial) {
		this.planeDetail = 100;
		this.plane = new THREE.PlaneGeometry( 200, 200, this.planeDetail - 1, this.planeDetail - 1);

		this.mesh = new THREE.Mesh(this.plane, canvasMaterial.material)
		scene.add(this.mesh)
		
	},

	updateGeometry: function(dna, object) {
		// Given some geometry, modify it to match this dna
		
		let s = 1500;
		for (var i =0; i < this.plane.vertices.length; i++) {
			let v =  this.plane.vertices[i];
			let x = Math.floor(i/this.planeDetail);
			let y = i%this.planeDetail;
			let pctX = x/(this.planeDetail -1);
			let pctY = y/(this.planeDetail - 1);
		
			v.x = s*(pctX - .5)
			v.z = s*(pctY - .5)
			// Get the height at this point
			v.y = 390*getHeight(dna, pctX, pctY) - 300;

		}
		this.plane.verticesNeedUpdate = true;
	}

}