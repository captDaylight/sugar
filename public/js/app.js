/*jslint browser: true*/

'use strict';

var THREE = require('three');
var onWindowResize = require('./events/onWindowResize');
var Physijs = require('./vendor/physi');
// var SimplexNoise = require('./vendor/simplex-noise');
Physijs.scripts.worker = './worker/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';

// project specific import
var addLights = require('./lights');
var addCamera = require('./camera');
var addLandscape = require('./landscape');
var addSkybox = require('./skybox');
var addVehicle = require('./vehicle');

var loader = new THREE.JSONLoader(),
	initScene, render,
	ground_material, box_material,
	projector, renderer, scene, ground, light, camera,
		vehicle_body, vehicle, input;


projector = new THREE.Projector;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
document.getElementById( 'container' ).appendChild( renderer.domElement );

scene = new Physijs.Scene;
scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
scene.addEventListener(
	'update',
	function() {

		if ( input && vehicle ) {
			if ( input.direction !== null ) {
				input.steering += input.direction / 50;
				if ( input.steering < -.6 ) input.steering = -.6;
				if ( input.steering > .6 ) input.steering = .6;
			}
			vehicle.setSteering( input.steering, 0 );
			vehicle.setSteering( input.steering, 1 );

			if ( input.power === true ) {
				vehicle.applyEngineForce( 1000 );
			} else if ( input.power === false ) {
				vehicle.setBrake( 20, 2 );
				vehicle.setBrake( 20, 3 );
			} else {
				vehicle.applyEngineForce( 0 );
			}
		}

		scene.simulate( undefined, 2 );
	}
);

// add elements to the scene
camera = addCamera(scene);
light = addLights(scene);
addLandscape(scene, Physijs, loader);
addSkybox(scene);
	

loader.load( "models/test/test.json", function( islands, islands_material ) {
	
	var box_material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xbbbbbb, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.8, transparent: true } ),
		.4, // low friction
		.6 // high restitution
	);	

	for ( var i = 0; i < 10; i++ ) {
		var size = Math.random() * 2 + .5;
		var mesh = new Physijs.ConvexMesh(
			islands,
			box_material,
			1
		);

		mesh.castShadow = true;
		mesh.position.set(
			Math.random() * 50 - 50,
			Math.random() * 50 + 15,
			Math.random() * 50 - 50
		);
		mesh.rotation.set(size, size, size);
		scene.add( mesh )
	}

});		

// addVehicle(scene, Physijs, loader, input, vehicle);

loader.load( "models/mustang/mustang.js", function( car, car_materials ) {
	loader.load( "models/mustang/mustang_wheel.js", function( wheel, wheel_materials ) {
		var mesh = new Physijs.BoxMesh(
			car,
			new THREE.MeshFaceMaterial( car_materials )
		);
		mesh.position.y = 5;
		mesh.castShadow = mesh.receiveShadow = true;
		vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
			10.88, // suspension_stiffness
			1.83, // suspension_compression
			0.28, // suspension_damping
			500, // max_suspension_travel
			10.5, // friction_slip
			6000 // max_suspension_force
		));
		scene.add( vehicle );

		var wheel_material = new THREE.MeshFaceMaterial( wheel_materials );

		for ( var i = 0; i < 4; i++ ) {
			vehicle.addWheel(
				wheel,
				wheel_material,
				new THREE.Vector3(
						i % 2 === 0 ? -1.6 : 1.6,
						-1,
						i < 2 ? 3.3 : -3.2
				),
				new THREE.Vector3( 0, -1, 0 ),
				new THREE.Vector3( -1, 0, 0 ),
				0.5,
				0.7,
				i < 2 ? false : true
			);
		}

		input = {
			power: null,
			direction: null,
			steering: 0
		};
		document.addEventListener('keydown', function( ev ) {
			switch ( ev.keyCode ) {
				case 37: // left
					input.direction = 1;
					break;

				case 38: // forward
					input.power = true;
					break;

				case 39: // right
					input.direction = -1;
					break;

				case 40: // back
					input.power = false;
					break;
			}
		});
		document.addEventListener('keyup', function( ev ) {
			switch ( ev.keyCode ) {
				case 37: // left
					input.direction = null;
					break;

				case 38: // forward
					input.power = null;
					break;

				case 39: // right
					input.direction = null;
					break;

				case 40: // back
					input.power = null;
					break;
			}
		});
	});
});


render = function() {
	requestAnimationFrame( render );

	if ( vehicle ) {
		camera.position.copy( vehicle.mesh.position ).add( new THREE.Vector3( 25, 10, 25 ) );
		camera.lookAt( vehicle.mesh.position );

		light.target.position.copy( vehicle.mesh.position );
		light.position.addVectors( light.target.position, new THREE.Vector3( 20, 20, -15 ) );
	}
	renderer.render( scene, camera );

};

requestAnimationFrame( render );
scene.simulate();

// window.onload = initScene;

window.addEventListener( 'resize', onWindowResize(camera, renderer), false );














