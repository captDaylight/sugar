			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var SCREEN_WIDTH = window.innerWidth;
			var SCREEN_HEIGHT = window.innerHeight;

			var container, stats;
			var camera, scene1, scene2, renderer;

			var morphs = [];
			var clock = new THREE.Clock();

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> webgl - morph normals - model by <a href="http://mirada.com/">mirada</a> from <a href="http://ro.me">rome</a>';
				container.appendChild( info );

				//

				camera = new THREE.PerspectiveCamera( 40, 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.y = 300;
				camera.target = new THREE.Vector3( 0, 150, 0 );

				scene1 = new THREE.Scene();
				scene2 = new THREE.Scene();

				//

				var light = new THREE.DirectionalLight( 0xffffff, 1.3 );
				light.position.set( 1, 1, 1 );
				scene1.add( light );

				var light = new THREE.DirectionalLight( 0xffffff, 0.1 );
				light.position.set( 0.25, -1, 0 );
				scene1.add( light );

				//

				var light = new THREE.DirectionalLight( 0xffffff, 1.3 );
				light.position.set( 1, 1, 1 );
				scene2.add( light );

				var light = new THREE.DirectionalLight( 0xffffff, 0.1 );
				light.position.set( 0.25, -1, 0 );
				scene2.add( light );

				//

				var loader = new THREE.JSONLoader();
				loader.load( "models/animated/flamingo.js", function( geometry ) {

					morphColorsToFaceColors( geometry );
					geometry.computeMorphNormals();

					var material = new THREE.MeshLambertMaterial( { color: 0xffffff, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
					var meshAnim = new THREE.MorphAnimMesh( geometry, material );

					meshAnim.duration = 5000;

					meshAnim.scale.set( 1.5, 1.5, 1.5 );
					meshAnim.position.y = 150;

					scene1.add( meshAnim );
					morphs.push( meshAnim );

				} );

				loader.load( "models/animated/flamingo.js", function( geometry ) {

					morphColorsToFaceColors( geometry );
					geometry.computeMorphNormals();

					var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 20, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.SmoothShading } );
					var meshAnim = new THREE.MorphAnimMesh( geometry, material );

					meshAnim.duration = 5000;

					meshAnim.scale.set( 1.5, 1.5, 1.5 );
					meshAnim.position.y = 150;

					scene2.add( meshAnim );
					morphs.push( meshAnim );

				} );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.sortObjects = false;
				renderer.autoClear = false;

				renderer.gammaInput = true;
				renderer.gammaOutput = true;

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

				container.appendChild( renderer.domElement );

				//

				stats = new Stats();
				container.appendChild( stats.domElement );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function morphColorsToFaceColors( geometry ) {

				if ( geometry.morphColors && geometry.morphColors.length ) {

					var colorMap = geometry.morphColors[ 0 ];

					for ( var i = 0; i < colorMap.colors.length; i ++ ) {

						geometry.faces[ i ].color = colorMap.colors[ i ];
						geometry.faces[ i ].color.offsetHSL( 0, 0.3, 0 );

					}

				}

			}

			//

			function onWindowResize( event ) {

				SCREEN_WIDTH = window.innerWidth;
				SCREEN_HEIGHT = window.innerHeight;

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

				camera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			var radius = 600;
			var theta = 0;

			function render() {

				theta += 0.1;

				camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );

				camera.lookAt( camera.target );

				var delta = clock.getDelta();

				for ( var i = 0; i < morphs.length; i ++ ) {

					morph = morphs[ i ];
					morph.updateAnimation( 1000 * delta );

				}

				renderer.clear();

				renderer.setViewport( 0, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT );
				renderer.render( scene1, camera );

				renderer.setViewport( SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT );
				renderer.render( scene2, camera );

			}
