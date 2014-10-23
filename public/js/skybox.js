"use strict";

var THREE = require('three');

var scene, mesh, shader, material, textureCube;

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

textureCube = THREE.ImageUtils.loadTextureCube( getSkyboxImageArray('Cube'), new THREE.CubeRefractionMapping());

shader = THREE.ShaderLib.cube;
shader.uniforms.tCube.value = textureCube;

material = new THREE.ShaderMaterial( {

    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide

} );

mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );



module.exports = mesh;