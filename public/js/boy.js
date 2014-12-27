var THREE = require('three');

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
var scene = new THREE.Scene();
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		1,
		2000
	);
var loader = new THREE.JSONLoader();
camera.position.z = 50;
camera.position.y = 10;
camera.position.x = 5;
scene.add(camera);
console.log(camera);
renderer.setClearColor( 0x000000, 0);

var onWindowResize = require('./events/onWindowResize');

var light2 = new THREE.AmbientLight(0x444444);
scene.add(light2);
var light3 = new THREE.AmbientLight(0x444444);
scene.add(light3);	

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var cube = new THREE.Mesh( geometry, material );
scene.add(cube);
console.log(cube);
loader.load( "models/boy/boy.js", function( boy, materials ) {
	mesh = new THREE.Mesh( boy, new THREE.MeshFaceMaterial( materials ) );
	scene.add( mesh );
	console.log('loaded');
	console.log(mesh);
	// var pointLight = new THREE.PointLight(0xFFFFFF);

	// // set its position
	// pointLight.position.x = 0;
	// pointLight.position.y = 0;
	// pointLight.position.z = 50;

});

renderer.setSize( window.innerWidth, window.innerHeight );

module.exports = function () {


	document.getElementById( 'container' ).appendChild( renderer.domElement );
	render = function() {
		requestAnimationFrame( render );
		var delta = clock.getDelta();

	};
	renderer.render(scene, camera);
	requestAnimationFrame( render );
}
window.addEventListener( 'resize', onWindowResize(camera, renderer), false );

