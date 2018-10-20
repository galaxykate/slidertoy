types.flower = {
	sliders: ["offset", "cubesize", "petalWidth","petalShape", "petalHueStart", "petalHueChange", "petalSatStart", "petalSatChange", "petalCount", "bushiness", "symmetry"],

	draw: function(dna, g) {
		g.background(0, 0, 0);

		g.pushMatrix();
		g.translate(g.width / 2, g.height / 2)
		g.fill(1);

		let theta = .6 * dna.bushiness + .2;
		let branchLen = 30 / (dna.bushiness + 2);

		function drawBranch(amt, size, id) {
			g.fill(1);

			g.noStroke();
			let s2 = size * .9;
			let len = size * (branchLen);
			if (amt < 1)
				len *= Math.pow(amt, .2)
			g.ellipse(0, 0, size, size);
			g.beginShape();
			g.vertex(-size, 0);
			g.vertex(size, 0);
			g.vertex(s2, len);
			g.vertex(-s2, len);
			g.endShape();

			g.translate(0, len);


			if (amt < 1) {
				let flowerSize = Math.pow(amt, .3)
				let petalCount = dna.petalCount * 8 + 3;
				let petalTheta = (Math.PI * 2 / (petalCount));


				for (var i = 0; i < petalCount; i++) {
					if (i > petalCount - 1)
						flowerSize *= petalCount - i;
					g.pushMatrix();
					g.rotate((i + utilities.noise(id + i * 10)) * petalTheta)

					let petalB = .7 + .5 * utilities.noise(id + i * 12 + 3)

					let petalComplexity = 10;
					let r0 = 0;
					let y0 = 0;
					let petalW = 2.8 / (petalCount + .1) * (dna.petalWidth + .3);
					for (var j = 1; j < petalComplexity + 1; j++) {
						y0 -= .3;
						let jPct = j / (petalComplexity)
						let y1 = jPct * flowerSize * 40;
						let jMod = (Math.sin(Math.pow(jPct, 1 + 2*dna.petalShape) * 3.14));

						let r1 = y1 * petalW * jMod;
						let h = dna.petalHueStart * 2 + 1.5 * Math.pow(jPct, .5) * (dna.petalHueChange - .5) + 1 + .1*utilities.noise(id + 30+ i * 120)
						let s = .2 + dna.petalSatStart + 3 * Math.pow(jPct, .8) * (dna.petalSatChange - .5)

						g.fill(h % 1, s, petalB)
						g.beginShape();
						g.vertex(r0, y0);
						g.vertex(r1, y1);
						g.vertex(-r1, y1);
						g.vertex(-r0, y0);
						g.endShape();
						r0 = r1;
						y0 = y1;
					}


					g.popMatrix();
				}

			} else {
				let m0 = 1 + .5 * dna.symmetry * utilities.noise(id + 20)
				let m1 = 1 + .5 * dna.symmetry * utilities.noise(id + 40)
				let t0 = .6 * dna.symmetry * utilities.noise(id + 60)
				let t1 = .6 * dna.symmetry * utilities.noise(id + 80)
				g.pushMatrix();
				g.rotate(theta * m1 + t0)
				drawBranch(amt - 1 * m1, s2 * m0, id + 100);
				g.popMatrix();
				g.pushMatrix();
				g.rotate(-theta * m0 + t1)
				drawBranch(amt - 1 * m0, s2 * m1, id + 200);
				g.popMatrix();
			}
		}


		g.pushMatrix();
		g.translate(0, g.height / 2 - 10);
		g.rotate(Math.PI)
		drawBranch(5, 4, dna.offset);
		g.popMatrix();

		g.popMatrix();
	},

	createGeometry: function(scene, canvasMaterial) {
		this.cubes = []
		var geometry = new THREE.BoxGeometry(100, 100, 100);

		for (var i = 0; i < 20; i++) {
			let m = new THREE.Mesh(geometry, canvasMaterial.material)
			scene.add(m);
			let s = Math.random() * 2 + 1;
			m.scale.set(s, s, s)
			m.position.x = (Math.random() - .5) * 100 * i;
			m.position.y = (Math.random() - .5) * 100 * i;
			m.position.z = (Math.random() - .5) * 100 * i;
			this.cubes.push(m)
		}
	},

	updateGeometry: function(dna, object) {
		// Given some geometry, modify it to match this dna
		for (var i = 0; i < this.cubes.length; i++) {
			let s = (1 + utilities.noise(i, dna.offset))*(1 + 1*dna.cubesize)
			this.cubes[i].scale.set(s, s, s)
		}
	}

}