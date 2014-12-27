var THREE = require('three');

module.exports = function (scene, Physijs, loader, listener) {

	// MATERIALS
	var ground_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/marble.jpg' ) }),
		.8, // high friction
		.4 // low restitution
	);
	ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	ground_material.map.repeat.set( 1, 1 );

	// MATERIALS
	var granite_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/granite.jpeg' ) }),
		.8, // high friction
		.4 // low restitution
	);
	ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	ground_material.map.repeat.set( 1, 1 );

	var wood_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/plywood.jpg' ) }),
		.8, // high friction
		.4 // low restitution
	);
	wood_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	wood_material.map.repeat.set( 1, 1 );

	var rocks_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) }),
		.8, // high friction
		.4 // low restitution
	);
	rocks_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	rocks_material.map.repeat.set( 1, 1 );

	var grass_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/grass.png' ) }),
		.8, // high friction
		.4 // low restitution
	);
	grass_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	grass_material.map.repeat.set( 10, 10 );

	// SOUNDS
	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var cube = new THREE.Mesh( geometry, material );

	var sound1 = new THREE.Audio( listener );
	sound1.load( 'sounds/1.ogg' );
	sound1.setRefDistance( 5 );
	sound1.setRolloffFactor(10);
	sound1.setLoop(true);

	cube.add(sound1);

	cube.position.z = -200;
	scene.add( cube );


	var geometry2 = new THREE.BoxGeometry( 2, 2, 2 );
	var material2 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var cube2 = new THREE.Mesh( geometry2, material2 );

	var sound2 = new THREE.Audio( listener );
	sound2.load( 'sounds/6.ogg' );
	sound2.setRefDistance( 5 );
	sound2.setRolloffFactor(10);
	sound2.setLoop(true);

	cube2.add(sound2);

	cube2.position.set(-260, 85, 45);
	scene.add( cube2 );


	var geometry3 = new THREE.BoxGeometry( 2, 2, 2 );
	var material3 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var cube3 = new THREE.Mesh( geometry3, material3 );

	var sound3 = new THREE.Audio( listener );
	sound3.load( 'sounds/6.ogg' );
	sound3.setRefDistance( 5 );
	sound3.setRolloffFactor(10);
	sound3.setLoop(true);

	cube3.add(sound3);

	cube3.position.set(141, 158, 295);
	scene.add( cube3 );


	// ISLAND 1
	loader.load( "models/islands/islands01.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			ground_material,
			0
		);

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