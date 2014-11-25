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


	// ISLAND 1
	loader.load( "models/islands/islands01.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		// var sound1 = new THREE.Audio( listener );
		// sound1.load( 'sounds/2.ogg' );
		// sound1.setRefDistance( 50 );
		// sound1.setLoop(true);

		// mesh.add(sound1);

		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// ISLAND 2
	loader.load( "models/islands/islands02.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// BRIDGE 1
	loader.load( "models/islands/islands03.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// ISLAND 3
	loader.load( "models/islands/islands04.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// BRIDGE 2
	loader.load( "models/islands/islands05.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// CASTLE
	loader.load( "models/islands/islands06.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// FOREGROUND CONES, ISLAND 1
	loader.load( "models/islands/islands07.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// ISLAND 1 CONES
 	loader.load( "models/islands/islands08.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// ISLAND 2 CONES RIGHT
 	loader.load( "models/islands/islands09.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

	// ISLAND 2 CONES RIGHT
 	loader.load( "models/islands/islands10.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

 		// ISLAND 2 CONES RIGHT
 	loader.load( "models/islands/islands11.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);
	});

}