/*jslint browser: true*/

'use strict';

var THREE = require('three');
var test = require('./test');

var camera, scene, renderer;

var texture_placeholder,
isUserInteracting = false,
lon = 90, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0,
target = new THREE.Vector3();

init();
animate();


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
console.log(mesh);
    scene.add( mesh );


    renderer = new THREE.WebGLRenderer({ antialiasing: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
	
	container.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function loadTexture( path ) {

	var texture = new THREE.Texture( texture_placeholder );
	var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

	var image = new Image();
	image.onload = function () {

		texture.image = this;
		texture.needsUpdate = true;

	};
	image.src = path;

	return material;

}

function animate() {

	requestAnimationFrame( animate );
	update();

}

function update() {

	if ( isUserInteracting === false ) {

		lon += 0.1;

	}

	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = THREE.Math.degToRad( 90 - lat );
	theta = THREE.Math.degToRad( lon );

	target.x = 500 * Math.sin( phi ) * Math.cos( theta );
	target.y = 500 * Math.cos( phi );
	target.z = 500 * Math.sin( phi ) * Math.sin( theta );

	camera.lookAt( target );

	renderer.render( scene, camera );

}