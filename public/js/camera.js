"use strict";

var THREE = require('three');

var camera;

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 11000 );
camera.position.z = -10;
camera.position.y = -10;
camera.position.x = -10;
module.exports = camera;