"use strict";

var THREE = require('three');

var camera;

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

module.exports = camera;