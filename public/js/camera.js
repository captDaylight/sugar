"use strict";

var THREE = require('three');



module.exports = function (scene) {		
	var camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	// scene.add( camera );

	return camera;
};