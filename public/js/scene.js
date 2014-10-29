'use strict';

var THREE = require('three');
var Physijs;

module.exports = function (physijs, ip, ve) {
	Physijs = physijs;

	return function () {
		var scene = new Physijs.Scene;
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
						vehicle.applyEngineForce( 300 );
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

		return scene;
	}
}