/*jslint browser: true*/

'use strict';

var THREE = require('three');
var camera = require('./camera');
var renderer = require('./renderer');
var animate = require('./animate');

var scene;

var texture_placeholder,
	isUserInteracting = false;

init();

function getSkyboxImageArray(location){
	var path = 'images/skyboxes/' + location + '/';
    var format = '.jpg';
    var urls = [
    	path + 'px' + format, path + 'nx' + format,
    	path + 'py' + format, path + 'ny' + format,
    	path + 'pz' + format, path + 'nz' + format
	];
	return urls;
}

function init() {

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

    var hemiLight1 = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );

    hemiLight1.color.setHSL( 0.6, 1, 0.6 );
    hemiLight1.groundColor.setHSL( .01, 0, 0.2 );
    hemiLight1.position.set( 0, 500, 0 );
    scene.add( hemiLight1 );

	var textureCube = THREE.ImageUtils.loadTextureCube( getSkyboxImageArray('Cube'), new THREE.CubeRefractionMapping());

    var shader = THREE.ShaderLib.cube;
    shader.uniforms.tCube.value = textureCube;
    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide

    } );

    mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );

    scene.add( mesh );



	
	container.appendChild( renderer.domElement );

	//


	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}


animate(camera, renderer, scene);
