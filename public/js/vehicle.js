var THREE = require('three');

module.exports = function (scene, Physijs, loader) {
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
};