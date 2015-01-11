/*jslint browser: true*/

'use strict';

var THREE = require('three');
var onWindowResize = require('./events/onWindowResize');
var Physijs = require('./vendor/physi');
// var SimplexNoise = require('./vendor/simplex-noise');
Physijs.scripts.worker = './worker/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';
var $ = require('jquery-browserify')

var fireball = require('./fireball');
var fireballTriggered = false;
var boySwitch = false; // when to switch the camera;
var boy;
var boyCam = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		1,
		2000
	);
boyCam.position.z = -50;
boyCam.position.y = 1000;


// project specific import
var addLights = require('./lights');
var addCamera = require('./camera');
var addLandscape = require('./landscape');
var addSkybox = require('./skybox');
// var addVehicle = require('./vehicle');
// require('./soundEvents');

var diamondsTriggered = false;
var diamondMesh;
var engine; // for particle engine

var loader = new THREE.JSONLoader(),
	splash = true,
	clock = new THREE.Clock(),
	initScene, render,
	ground_material, box_material,
	projector, renderer, scene, ground, light, camera,
		vehicle_body, vehicle, input, listener,
		c, c_materials, w, w_materials, mesh1;


var ambient = document.getElementById('ambient'); // ambient music that plays throughought 
ambient.addEventListener('ended', function () {
	this.currentTime = 0;
	this.volume = 0.3;
	console.log(this);
	this.play();
}, false);


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

loader.load( "models/gto/gto.js", function( car, car_materials ) {
	loader.load( "models/mustang/mustang_wheel.js", function( wheel, wheel_materials ) {
		
		c = car;
		c_materials = car_materials;
		w = wheel; 
		w_materials = wheel_materials;

		createCar(car, car_materials, wheel, wheel_materials);

	});
});


loader.load( "models/boy/newboy.js", function( obj, materials ) {
	var mesh = new THREE.Mesh( obj, new THREE.MeshFaceMaterial( materials ) );
	scene.add( mesh );

	mesh.position.y = 1000;
	boy = mesh;
	boyCam.lookAt( mesh.position );
});

//temporary fairy
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var fairy = new THREE.Mesh( geometry, material );
var fairyY = 170;
fairy.position.set(168, fairyY, 332);
scene.add(fairy);


function createCar(car, car_materials, wheel, wheel_materials) {
	var mesh = new Physijs.BoxMesh(
		car,
		new THREE.MeshFaceMaterial( car_materials )
	);
	mesh.position.y = 5;
	mesh.castShadow = mesh.receiveShadow = true;
	camera.position.y = 10;
	camera.position.z = -40;
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
			case 65:
				boySwitch = true;
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


	// SOUNDS
	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var cube = new THREE.Mesh( geometry, material );

	var sound1 = new THREE.Audio( listener );
	sound1.load( 'sounds/island01.ogg' );
	sound1.setRefDistance( 100 );
	sound1.setRolloffFactor(20);
	sound1.setLoop(true);

	cube.add(sound1);

	cube.position.z = -200;
	cube.position.y = -5;

	scene.add( cube );


	var geometry2 = new THREE.BoxGeometry( 2, 2, 2 );
	var material2 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var cube2 = new THREE.Mesh( geometry2, material2 );

	var sound2 = new THREE.Audio( listener );
	sound2.load( 'sounds/island02.ogg' );
	sound2.setRefDistance( 100 );
	sound2.setRolloffFactor(50);
	sound2.setLoop(true);

	cube2.add(sound2);

	cube2.position.set(-260, 80, 45);
	scene.add( cube2 );


	var geometry3 = new THREE.BoxGeometry( 2, 2, 2 );
	var material3 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var cube3 = new THREE.Mesh( geometry3, material3 );

	var sound3 = new THREE.Audio( listener );
	sound3.load( 'sounds/island03.ogg' );
	sound3.setRefDistance( 120 );
	sound3.setRolloffFactor(50);
	sound3.setLoop(true);

	cube3.add(sound3);

	cube3.position.set(141, 150, 295);
	scene.add( cube3 );

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

		mesh.castShadow = true;
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

var reload = document.getElementById("reload");

reload.addEventListener("click", function (evt) {
	var audio = document.getElementById('death');

	// resetting the vehicle
	vehicle.mesh.position.set( 0, 5, -200 );
	vehicle.mesh.rotation.set( 0, 0, 0 );
	vehicle.mesh.setAngularVelocity(new THREE.Vector3( 0, 0, 0 ));
	vehicle.mesh.setLinearVelocity(new THREE.Vector3( 0, 0, 0 ));
	vehicle.mesh.__dirtyPosition = true;
	vehicle.mesh.__dirtyRotation = true;

	// resetting after the fall, if it happens
	fireballTriggered = false;
	boySwitch = false;
	audio.pause();
	audio.currentTime = 0;
	fireball.setFire(false);
	ambient.currentTime = 0;
	ambient.play();
}, false);



// create the text behind the castle
// via stemkoski
// create a canvas element
function daysUntil(year, month, day) {
  var now = new Date(),
      dateEnd = new Date(year, month - 1, day), // months are zero-based
      days = (dateEnd - now) / 1000/60/60/24;   // convert milliseconds to days

  return Math.round(days);
}

// setTimeout(function () {

// var canvas1 = document.createElement('canvas');
// var context1 = canvas1.getContext('2d');
// context1.font = "Bold 50px chopin";
// context1.textAlign="center"; 
// context1.fillStyle = "rgba(0,0,0,0.95)";
// context1.fillText(daysUntil(2015, 2, 23), 150, 60);

// // canvas contents will be used for a texture
// var texture1 = new THREE.Texture(canvas1) 
// texture1.needsUpdate = true;
  
// var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
// material1.transparent = true;

// var mesh1 = new THREE.Mesh(
//     new THREE.PlaneBufferGeometry(canvas1.width, canvas1.height),
//     material1
//   );
// mesh1.scale.set(0.1,0.1,0.1);
// mesh1.position.set(0,0,-150);
// // mesh1.position.set(263,172,381);
// scene.add( mesh1 );
// },0);
function addText() {
	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = "Bold 150px chopin";
	context1.textAlign="center"; 
	context1.fillStyle = "rgba(0,0,0,0.95)";
	context1.fillText(daysUntil(2015, 2, 23), 150, 100);

	// canvas contents will be used for a texture
	var texture1 = new THREE.Texture(canvas1) 
	texture1.needsUpdate = true;
	  
	var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
	material1.transparent = true;

	mesh1 = new THREE.Mesh(
	    new THREE.PlaneBufferGeometry(canvas1.width, canvas1.height),
	    material1
	  );
	mesh1.scale.set(0.1,0.1,0.1);
	// mesh1.position.set(0,10,-150);
	mesh1.position.set(263,172,381);
	scene.add( mesh1 );
}

var renderCounter = 0;

render = function() {
	requestAnimationFrame( render );
	

	renderCounter += .02;

	if ( !boySwitch ) {
		fairy.position.y = fairyY + (Math.sin(renderCounter) * 1.5);
		if ( vehicle ) {

			light.target.position.copy( vehicle.mesh.position );
			light.position.addVectors( light.target.position, new THREE.Vector3( 100, 100, -105 ) );

			if ( !diamondsTriggered  && ( vehicle.mesh.position.x < -35 || vehicle.mesh.position.z < -220) ) {
				randomDiamonds(diamondMesh);
				diamondsTriggered = true;
			}

			if ( splash && vehicle.wheels[0].position.z < -10 ) {
				var d = document.getElementById('cover');
				d.className = d.className + ' remove';

				splash = false;
				ambient.volume = 0.3;
				ambient.play();

				addText()
			}

			if ( vehicle.mesh.position.y < -1500 && !fireballTriggered ) {
				fireball.renderer();
				fireball.setFire(true);
				fireballTriggered = true;

				$('#ambient').animate({volume:0},6000, function () {
					ambient.pause();
					$(this).animate({volume:0.3},10);
				});
				setTimeout(function () {
					if ( fireballTriggered ) {
						boySwitch = true;
						document.getElementById('death').play();
						setTimeout(function () {
							fireball.setFire(false);
						}, 2000);						
					}

				}, 6000);
			}
			if (!splash){
				mesh1.rotation.y = mesh1.rotation.y + 0.01;				
			}
			
			renderer.render( scene, camera );

		}		
	} else {
		boy.rotation.x = boy.rotation.x + 0.01;
		boy.rotation.y = boy.rotation.y + 0.03;
		boy.rotation.z = boy.rotation.z + 0.01;
		renderer.render( scene, boyCam );
	}


};

requestAnimationFrame( render );
scene.simulate();

// window.onload = initScene;

window.addEventListener( 'resize', onWindowResize(camera, renderer), false );














