"use strict";

var THREE = require('three');

var target = new THREE.Vector3(),
	lon = 90,
	lat = 0,
	phi = 0, 
	theta = 0,
	camera,
	renderer,
	scene;



function update() {
	
	if ( vehicle ) {
		camera.position.copy( vehicle.mesh.position ).add( new THREE.Vector3( 25, 10, 25 ) );
		camera.lookAt( vehicle.mesh.position );

		light.target.position.copy( vehicle.mesh.position );
		light.position.addVectors( light.target.position, new THREE.Vector3( 20, 20, -15 ) );
	}
	renderer.render( scene, camera );
	
};

function update() {
	lon += 0.1;

	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = THREE.Math.degToRad( 90 - lat );
	theta = THREE.Math.degToRad( lon );

	target.x = 500 * Math.sin( phi ) * Math.cos( theta );
	target.y = 500 * Math.cos( phi );
	target.z = 500 * Math.sin( phi ) * Math.sin( theta );

	camera.lookAt( target );

	renderer.render( scene, camera );
}

module.exports = function(cam, rend, sc){
	
	camera = cam;
	renderer = rend;
	scene = sc

	return function animate() {

		requestAnimationFrame( animate );
		update();

	};
};