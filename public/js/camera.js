"use strict";

var THREE = require('three');



module.exports = function (scene, listener) {		
	var camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		1,
		2000
	);
	
	camera.add( listener );
	// scene.add( camera );

	return camera;
};