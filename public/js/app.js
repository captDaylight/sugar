/*jslint browser: true*/

'use strict';

var THREE = require('three');
var camera = require('./camera');
var renderer = require('./renderer');
var animate = require('./animate');
var terrain = require('./terrain');
console.log(terrain);
var scene;

var texture_placeholder,
	isUserInteracting = false;

var container, mesh;

container = document.getElementById( 'container' );

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

scene = new THREE.Scene();

texture_placeholder = document.createElement( 'canvas' );
texture_placeholder.width = 128;
texture_placeholder.height = 128;

var context = texture_placeholder.getContext( '2d' );
context.fillStyle = 'rgb( 200, 200, 200 )';
context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );


scene.add(require('./skybox'));


container.appendChild( renderer.domElement );


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

window.addEventListener( 'resize', onWindowResize, false );

animate(camera, renderer, scene);
