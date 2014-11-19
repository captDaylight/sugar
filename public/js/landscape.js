var THREE = require('three');

module.exports = function (scene, Physijs, loader, listener) {
	// Materials
	ground_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/marble.jpg' ) }),
		.8, // high friction
		.4 // low restitution
	);
	ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	ground_material.map.repeat.set( 1, 1 );


	loader.load( "models/islands/islands01.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		var sound1 = new THREE.Audio( listener );
		sound1.load( 'sounds/2.ogg' );
		sound1.setRefDistance( 50 );

		mesh.add(sound1);

		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	loader.load( "models/islands/islands02.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	loader.load( "models/islands/islands03.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	loader.load( "models/islands/islands04.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

}