var THREE = require('three');

module.exports = function (scene) {
	console.log(scene);
	console.log();
	// Light
	var light = new THREE.DirectionalLight( 0xFFFFFF );
	light.position.set( 20, 20, -15 );
	light.target.position.copy( scene.position );
	light.castShadow = true;
	light.shadowCameraLeft = -150;
	light.shadowCameraTop = -150;
	light.shadowCameraRight = 150;
	light.shadowCameraBottom = 150;
	light.shadowCameraNear = 20;
	light.shadowCameraFar = 400;
	light.shadowBias = -.0001
	light.shadowMapWidth = light.shadowMapHeight = 2048;
	light.shadowDarkness = .7;
	scene.add( light );


	var light2 = new THREE.AmbientLight(0x444444);
	scene.add(light2);
	var light3 = new THREE.AmbientLight(0x444444);
	scene.add(light3);	

	return light;

}



