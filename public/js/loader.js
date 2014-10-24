var THREE = require('three');

var loader = new THREE.JSONLoader(); // init the loader util
var newObject;

// init loading
loader.load('objects/Skull_0307.js', function (geometry) {
    // create a new material

    // this is the same as the other objects
    // var material = new THREE.MeshBasicMaterial( { color: 0x666666, envMap: skyMaterials[0], refractionRatio: 0.99 } );
    // var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0xff0000, shininess: 50, shading: THREE.FlatShading } )
	var material = new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xaaaaaa, envMap: skyMaterials[0] } )
	// var material = new THREE.MeshLambertMaterial( { color: 0xff0000, ambient: 0xffffff, envMap: skyMaterials[3], refractionRatio: 0.95 } );
	//var material = new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0x993300, envMap: skyMaterials[0], combine: THREE.MixOperation, reflectivity: 0.3 } );
    // var material = offMaterial;
    // create a mesh with models geometry and material
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    newObject = mesh;
    newObject.scale.x = newObject.scale.y = newObject.scale.z = 38;

    scene.add(newObject);
});