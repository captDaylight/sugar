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

	var satin_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/satin.jpg' ) }),
		.8, // high friction
		.4 // low restitution
	);
	ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	ground_material.map.repeat.set( 1, 1 );

	var slate_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/slate.jpg' ) }),
		.8, // high friction
		.4 // low restitution
	);
	slate_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	slate_material.map.repeat.set( 1, 1 );

	// // MATERIALS
	// var granite_material = Physijs.createMaterial(
	// 	new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/granite.jpeg' ) }),
	// 	.8, // high friction
	// 	.4 // low restitution
	// );
	// ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	// ground_material.map.repeat.set( 1, 1 );

	// var wood_material = Physijs.createMaterial(
	// 	new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/plywood.jpg' ) }),
	// 	.8, // high friction
	// 	.4 // low restitution
	// );
	// wood_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	// wood_material.map.repeat.set( 1, 1 );

	// var rocks_material = Physijs.createMaterial(
	// 	new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) }),
	// 	.8, // high friction
	// 	.4 // low restitution
	// );
	// rocks_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	// rocks_material.map.repeat.set( 1, 1 );

	// var grass_material = Physijs.createMaterial(
	// 	new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/grass.png' ) }),
	// 	.8, // high friction
	// 	.4 // low restitution
	// );
	// grass_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	// grass_material.map.repeat.set( 10, 10 );



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
			satin_material,
			0
		);
		mesh.receiveShadow = true;
		scene.add(mesh);

	});

	// CASTLE ROOF
	loader.load( "models/islands/islands12.json", function( islands, islands_material ) {
		
		var mesh = new Physijs.ConvexMesh(
			islands,
			slate_material,
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