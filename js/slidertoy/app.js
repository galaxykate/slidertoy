let artifact, processing, pCanvas, threeScene, threeCam;
$(function() {
	console.log("READY")



	// Create processing & Three
	utilities.createProcessing($("#slidertoy-pview"), t => {}, (g, t) => {}, (g, t) => {
		// Init
		processing = g;

	
		// After creating processing, create 3JS
		utilities.createThree($("#slidertoy-threeview"), (time, scene, orbitalCamera) => {
			// console.log("init")
			//var material = new THREE.MeshNormalMaterial();
			threeScene = scene;
			threeCam = orbitalCamera;

			// Then create the editor
			let editor = new Editor($("#section-editor .section-main"));



			editor.setType("terrain");
		}, () => {});
	})


	// $("#slidertoy-threeview").hide();







	// Done
});