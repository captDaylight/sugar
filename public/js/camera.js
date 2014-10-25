"use strict";

var THREE = require('three');

var camera;

camera = new THREE.PerspectiveCamera(
	35,
	window.innerWidth / window.innerHeight,
	1,
	1000
);
camera.position.set( 60, 50, 60 );

module.exports = camera;