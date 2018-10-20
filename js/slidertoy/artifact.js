// All the types 
let types = {};

// An artifact being edited  
// It has a dna (an array of floats)

function Artifact(type, parents) {
	this.type = type;

	this.dna = createDNA(type)
	
	// let scene = threeScene;
	// var material = new THREE.MeshLambertMaterial({
	// 	map: threeScene,
	// });
	// var geometry = new THREE.BoxGeometry(100, 100, 100);

	// for (var i = 0; i < 20; i++) {
	// 	let m = new THREE.Mesh(geometry, materialTexture)
	// 	scene.add(m);
	// 	m.position.x = (Math.random() - .5) * 100 * i;
	// 	m.position.y = (Math.random() - .5) * 100 * i;
	// 	m.position.z = (Math.random() - .5) * 100 * i;
	// }
}

Artifact.prototype.draw = function(g) {
	this.type.draw(this.dna, g)
}


Artifact.prototype.createGeometry = function(scene, canvasMaterial) {
	console.log("create geometry")
	this.type.createGeometry(scene, canvasMaterial)
}



Artifact.prototype.updateGeometry = function() {
	this.type.updateGeometry(this.dna)
}

function createDNA(type) {
	let dna = {};
	type.sliders.forEach((type) => {
		dna[type] = Math.random();
	})
	return dna;
}