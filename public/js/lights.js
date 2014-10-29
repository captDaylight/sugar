var THREE = require('three');
var lights = [],
	light,
	light2;

// Light
light = new THREE.DirectionalLight( 0xFFFFFF );
light.position.set( 20, 20, -15 );
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
lights.push( light );

var light2 = new THREE.AmbientLight(0x444444);
lights.push(light2);


module.exports = lights;
