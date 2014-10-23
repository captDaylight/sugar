"use strict";

var THREE = require('three');

var renderer;

renderer = new THREE.WebGLRenderer({ antialiasing: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.autoClear = false;

module.exports = renderer;