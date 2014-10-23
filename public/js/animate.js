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

function animate(cam, rend, sc) {

	if (arguments.length === 3) {
		camera = cam;
		renderer = rend;
		scene = sc
	}

	requestAnimationFrame( animate );

	update();

}

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

module.exports = animate;