var THREE = require('three');
// var addSkybox = require('./skybox');

var clock = new THREE.Clock();

var container;
var camera, projector, scene, renderer, mouse;
var cameraCube, sceneCube;

var mesh, lightMesh, geometry, centralBeacon;
var spheres = [];
var loader = new THREE.JSONLoader(); // init the loader util
var uniforms1;
var sphere, lightMesh, pointLight;

var onMaterial, offMaterial;

var directionalLight, pointLight;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );



// the first one will be the default, the rest for each object
var skyboxDirectories = [
	'NeoShade',
	'DeathStar',
	'MetaCave',
	'Vulcan',
	'Starz',
	'LineVort',
	'Cube',
	'LineCave',
	'MindHelix'
];


var skyMaterials = [];
var currentBackground = 0;

// kickstart the application
// init();
// animate();

function getSkyboxImageArray(location){
	var path = 'images/skyboxes/' + location + '/';
    var format = '.jpg';
    var urls = [
    	path + 'px' + format, path + 'nx' + format,
    	path + 'py' + format, path + 'ny' + format,
    	path + 'pz' + format, path + 'nz' + format
	];
	return urls;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateTexture() {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 256;
	canvas.height = 256;

	var context = canvas.getContext( '2d' );
	var image = context.getImageData( 0, 0, 256, 256 );

	var x = 0, y = 0;

	for ( var i = 0, j = 0, l = image.data.length; i < l; i += 4, j ++ ) {

		x = j % 256;
		y = x == 0 ? y + 1 : y;

		image.data[ i ] = 255;
		image.data[ i + 1 ] = 255;
		image.data[ i + 2 ] = 255;
		image.data[ i + 3 ] = Math.floor( x ^ y );

	}

	context.putImageData( image, 0, 0 );

	return canvas;

}




function init() {

	mouse = new THREE.Vector2();

	var texture = new THREE.Texture( generateTexture() );
	texture.needsUpdate = true;

	// SET UP SCENE, CAMERA, LIGHTS
	////////////////////

    camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.z = -25000;

    cameraCube = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 100000 );

    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();
    projector = new THREE.Projector();
		    
    var hemiLight1 = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );

    hemiLight1.color.setHSL( 0.6, 1, 0.6 );
    hemiLight1.groundColor.setHSL( .01, 0, 0.2 );
    hemiLight1.position.set( 0, 500, 0 );
    scene.add( hemiLight1 );


    // add a circulating light
    pointLight = new THREE.PointLight( 0xff0000, 1 );
	scene.add( pointLight );
	sphere = new THREE.SphereGeometry( 10000, 16, 8 );
	lightMesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	lightMesh.position = pointLight.position;
	lightMesh.scale.x = lightMesh.scale.y = lightMesh.scale.z = 0.05;
	// console.log(lightMesh);
	// scene.add( lightMesh );  // visualize the light
    ////////////////////





	// START UP ALL OF THE SKY MATERIALS
	////////////////////
	for(var i = 0; i < 5; i++){
		var urls = getSkyboxImageArray(skyboxDirectories[i]);
		var textureCube = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping());
		var material = new THREE.MeshBasicMaterial( { color: 0xeeeeee, envMap: textureCube, refractionRatio: 0.99 } );
		// var material = new THREE.MeshBasicMaterial( { color: 0xaaaaff, envMap: textureCube } );
		// var material = new THREE.MeshLambertMaterial( { color: 0xffffff, emissive: 0x0000ff, shading: THREE.FlatShading } );
		skyMaterials.push({material: material, textureCube: textureCube});
	}

	////////////////////




    // CREATE THE SKYBOX MATERIAL AND CUBE
    ////////////////////

    var geometry = new THREE.SphereGeometry( 8000, 4, 4 );
    var material = skyMaterials[currentBackground]['material'];



    // ADD SKYBOX TO SCENE WITH MATERIAL
    ////////////////////

    var shader = THREE.ShaderLib.cube;
    shader.uniforms.tCube.value = skyMaterials[currentBackground]['textureCube'];
    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide

    } )
    mesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000 ), material );

    sceneCube.add( mesh );

    createSkybox();


    // LOAD THE CENTRAL OBJECT TO THE SCENE
    ////////////////////

    var loader = new THREE.JSONLoader(); // init the loader util

	// init loading
	loader.load('models/Skull_0307.js', function (geometry) {
	    // create a new material

	    // this is the same as the other objects
	    
	    
		
		var material = new THREE.MeshLambertMaterial( { color: 0xff0000, ambient: 0xffffff, envMap: skyMaterials[3], refractionRatio: 0.95 } );
		var material = new THREE.MeshBasicMaterial( { color: 0x666666, envMap: skyMaterials[0], refractionRatio: 0.99 } );
		var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0xff0000, shininess: 50, shading: THREE.FlatShading } )
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xaaaaaa, envMap: skyMaterials[0] } )
		//var material = new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0x993300, envMap: skyMaterials[0], combine: THREE.MixOperation, reflectivity: 0.3 } );
	    // var material = offMaterial;
	    // create a mesh with models geometry and material
	    var mesh = new THREE.Mesh(
	        geometry,
	        material
	    );

	    centralBeacon = mesh;
	    centralBeacon.scale.x = centralBeacon.scale.y = centralBeacon.scale.z = 38;

	    scene.add(centralBeacon);
	});


	// addSkybox(scene);
	
    // on window resize
	// window.addEventListener( 'resize', onWindowResize, false );

}


// function onWindowResize() {

// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( window.innerWidth, window.innerHeight );

// }

function onDocumentMouseMove(event) {

	event.preventDefault();

	var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, camera );

    mouseX = ( event.clientX - windowHalfX ) * 22;
    mouseY = -( event.clientY - windowHalfY ) * 22;

}

function createSkybox() {
	var mesh, shader, material, textureCube; 
	textureCube = THREE.ImageUtils.loadTextureCube( getSkyboxImageArray(skyboxDirectories[3]), new THREE.CubeRefractionMapping());
	shader = THREE.ShaderLib.cube;
	shader.uniforms.tCube.value = textureCube;

	material = new THREE.ShaderMaterial( {

	    fragmentShader: shader.fragmentShader,
	    vertexShader: shader.vertexShader,
	    uniforms: shader.uniforms,
	    depthWrite: false,
	    side: THREE.BackSide

	} );

	mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );

	scene.add(mesh);

	return mesh;

}




module.exports = render = function (renderer) {
	return function () {
		init();
		return function () {
		    var timer = 0.001 * Date.now();
		    // move the light around the scene
			lightMesh.position.x = 20000 * Math.cos( timer );
			lightMesh.position.z = 20000 * Math.sin( timer );

		    if(centralBeacon !== undefined){
			    centralBeacon.position.y = -7000
			    centralBeacon.position.x = -1000
			    centralBeacon.position.z = 10000
			    centralBeacon.rotation.y += .005
			    centralBeacon.rotation.x += .000;
		    }

		    camera.position.x += ( mouseX - camera.position.x ) * .1;
		    camera.position.y += ( - mouseY - camera.position.y ) * .1;

		    camera.lookAt( scene.position );
		    cameraCube.rotation.copy( camera.rotation );

		    renderer.render( sceneCube, cameraCube );
		    renderer.render( scene, camera );				
		}
	
	};

};

