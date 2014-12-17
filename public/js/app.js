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
// var addVehicle = require('./vehicle');
// require('./soundEvents');

var diamondsTriggered = false;
var diamondMesh;

var loader = new THREE.JSONLoader(),
	splash = true,
	initScene, render,
	ground_material, box_material,
	projector, renderer, scene, ground, light, camera,
		vehicle_body, vehicle, input, listener,
		c, c_materials, w, w_materials;

function getCameraVector(objYRotation, distance) {

	var coords = {x:0, z:0};

	coords.x = Math.sin(objYRotation) * distance;

	coords.z = Math.pow( (Math.pow(distance, 2) + Math.pow(coords.x, 2)), 0.5);

	return coords;
}

listener = new THREE.AudioListener();
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
			} else {
				input.steering = 0;
			}
			vehicle.setSteering( input.steering, 0 );
			vehicle.setSteering( input.steering, 1 );

			if ( input.power === true ) {
				vehicle.applyEngineForce( 600 );
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
camera = addCamera(scene, listener);
light = addLights(scene);
addLandscape(scene, Physijs, loader, listener);
addSkybox(scene);
	

loader.load( "models/test/test.json", function( diamond, islands_material ) {
	
	diamondMesh = diamond;

});		

// addVehicle(scene, Physijs, loader, input, vehicle);

loader.load( "models/mustang/mustang.js", function( car, car_materials ) {
	loader.load( "models/mustang/mustang_wheel.js", function( wheel, wheel_materials ) {
		
		c = car;
		c_materials = car_materials;
		w = wheel; 
		w_materials = wheel_materials;

		createCar(car, car_materials, wheel, wheel_materials);

	});
});

function createCar(car, car_materials, wheel, wheel_materials) {
	var mesh = new Physijs.BoxMesh(
		car,
		new THREE.MeshFaceMaterial( car_materials )
	);
	mesh.position.y = 5;
	mesh.castShadow = mesh.receiveShadow = true;
	camera.position.y = 3;
	camera.position.z = -25;
	camera.lookAt( mesh.position );
	mesh.add(camera);

	mesh.position.z = -200;

	vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
		11.88, // suspension_stiffness
		2.83, // suspension_compression
		0.28, // suspension_damping
		500, // max_suspension_travel
		10.5, // friction_slip
		4000 // max_suspension_force
	));

	scene.add( vehicle );

	var wheel_material = new THREE.MeshFaceMaterial( wheel_materials );

	for ( var i = 0; i < 4; i++ ) {
		vehicle.addWheel(
			wheel,
			wheel_material,
			new THREE.Vector3(
					i % 2 === 0 ? -2.0 : 2.0,
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
	
	console.log(vehicle.mesh.position);
	console.log(vehicle.mesh.rotation);

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
}

function randomDiamonds(diamond) {
	
	var box_material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xbbbbbb, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.8, transparent: true } ),
		.4, // low friction
		.6 // high restitution
	);	
	
	for ( var i = 0; i < 15; i++ ) {
		var size = Math.random() * 2 + .5;
		var mesh = new Physijs.ConvexMesh(
			diamond,
			box_material,
			1
		);

		// mesh.castShadow = true;
		mesh.position.set(
			Math.random() * 30 - 120,
			Math.random() * 50 + 50,
			Math.random() * 30 - 250
		);
		mesh.rotation.set(size, size, size);
		scene.add( mesh )
	}
}

var cameraVector;
var relativeCameraOffset, cameraOffset;

var test = document.getElementById("reload");

test.addEventListener("click", function (evt) {

	scene.remove(vehicle);
    createCar(c, c_materials, w, w_materials);

}, false);

render = function() {
	requestAnimationFrame( render );

	if ( vehicle ) {

		light.target.position.copy( vehicle.mesh.position );
		light.position.addVectors( light.target.position, new THREE.Vector3( 20, 20, -15 ) );
		
		if ( !diamondsTriggered  && ( vehicle.mesh.position.x < -35 || vehicle.mesh.position.z < -220) ) {
			randomDiamonds(diamondMesh);
			diamondsTriggered = true;
		}

		if ( splash && vehicle.wheels[0].position.z < -10 ) {
			var d = document.getElementById('cover');
			d.className = d.className + ' remove';
			splash = false;
		}

	}
	renderer.render( scene, camera );
};

requestAnimationFrame( render );
scene.simulate();

// window.onload = initScene;

window.addEventListener( 'resize', onWindowResize(camera, renderer), false );














