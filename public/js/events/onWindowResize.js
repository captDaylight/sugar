module.exports = function (camera, renderer) {

	return function onWindowResize() {
		console.log('window resizing');
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	};
}