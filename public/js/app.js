/*jslint browser: true*/

'use strict';

var THREE = require('three');
var camera = require('./camera');
var renderer = require('./renderer');
var animate = require('./animate');
var onWindowResize = require('./events/onWindowResize');

var scene, 
	container, 
	mesh;

container = document.getElementById( 'container' );

scene = new THREE.Scene();

scene.add(require('./skybox'));

container.appendChild( renderer.domElement );

var hemiLight1 = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );

hemiLight1.color.setHSL( 0.6, 1, 0.6 );
hemiLight1.groundColor.setHSL( .01, 0, 0.2 );
hemiLight1.position.set( 0, 500, 0 );
scene.add( hemiLight1 );

var loader = new THREE.JSONLoader(); // init the loader util
var newObject;

// init loading
loader.load('models/moto.json', function (geometry) {
    var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0xff0000, shininess: 50, shading: THREE.FlatShading } )
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    newObject = mesh;
    newObject.scale.x = newObject.scale.y = newObject.scale.z = .001;
    newObject.position.y = -10;
    newObject.position.x = -10;
    newObject.position.z = -7;
    newObject.rotation.x = 2;
    newObject.rotation.y = 2;
    scene.add(newObject);
});

window.addEventListener( 'resize', onWindowResize(camera, renderer), false );

animate(camera, renderer, scene);