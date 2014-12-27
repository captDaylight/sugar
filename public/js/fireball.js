var THREE = require('three');

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
var scene = new THREE.Scene();
var clock = new THREE.Clock();
var fire = true;
var camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		1,
		2000
	);
var loader = new THREE.JSONLoader();
camera.position.z = 50;
camera.position.y = 10;
camera.position.x = 5;
scene.add(camera);
renderer.setClearColor( 0x000000, 0);
var onWindowResize = require('./events/onWindowResize');
// camera.lookAt(cube);

var light2 = new THREE.AmbientLight(0x444444);
scene.add(light2);
var light3 = new THREE.AmbientLight(0x444444);
scene.add(light3);	


renderer.setSize( window.innerWidth, window.innerHeight );

var smokeParticles = new THREE.Geometry;

var smokeTexture = THREE.ImageUtils.loadTexture('images/smoke.png');
var smokeMaterial = new THREE.ParticleBasicMaterial({ map: smokeTexture, transparent: true, blending: THREE.AdditiveBlending, size: 5, color: 0x111111 });

for (var i = 0; i < 300; i++) {
	var particle = new THREE.Vector3(Math.random() * 12, Math.random() * 50, Math.random() * 12);
	smokeParticles.vertices.push(particle);
};

var smoke = new THREE.ParticleSystem(smokeParticles, smokeMaterial);
smoke.sortParticles = true;

scene.add(smoke);

module.exports = {
	setFire: function (bool) {
		fire = bool;
	},
	renderer: function () {

		document.getElementById( 'container' ).appendChild( renderer.domElement );
		render = function() {
			requestAnimationFrame( render );

			var delta = clock.getDelta();

			var particleCount = smokeParticles.vertices.length;

			while (particleCount--) {
			    var particle = smokeParticles.vertices[particleCount];
			    particle.z += delta * 50;
			    
			    if (particle.z >= 50 && fire ) {
			        particle.y = Math.random() * 12;
			        particle.x = Math.random() * 12;
			        particle.z = Math.random() * 12;
			    }
			}
			smokeParticles.__dirtyVertices = true;	
			renderer.render(scene, camera);
		};

		requestAnimationFrame( render );
	}
}
window.addEventListener( 'resize', onWindowResize(camera, renderer), false );

