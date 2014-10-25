var THREE = require('three');
var light;
// Light
light = new THREE.DirectionalLight( 0xFFFFFF );
light.position.set( 20, 40, -15 );
light.target.position.copy( scene.position );
light.castShadow = true;
light.shadowCameraLeft = -60;
light.shadowCameraTop = -60;
light.shadowCameraRight = 60;
light.shadowCameraBottom = 60;
light.shadowCameraNear = 20;
light.shadowCameraFar = 200;
light.shadowBias = -.0001
light.shadowMapWidth = light.shadowMapHeight = 2048;
light.shadowDarkness = .7;

module.exports = light;